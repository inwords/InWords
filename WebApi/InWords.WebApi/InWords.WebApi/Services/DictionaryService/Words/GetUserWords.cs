using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Extensions.InWordsDataContext;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.DictionaryService.Words
{
    public class GetUserWords : AuthorizedRequestObjectHandler<GetWordsRequest, WordsReply, InWordsDataContext>
    {
        public GetUserWords(InWordsDataContext context) : base(context)
        {
        }

        [SuppressMessage("Design", "CA1062:Проверить аргументы или открытые методы", Justification = "<Ожидание>")]
        public override Task<WordsReply> HandleRequest(AuthorizedRequestObject<GetWordsRequest, WordsReply> request,
            CancellationToken cancellationToken = default)
        {
            return Task.Run(() =>
            {
                int userId = request.UserId;
                GetWordsRequest value = request.Value;
                WordsReply reply = new WordsReply();

                HashSet<int> clientIds = value.UserWordpairIds.ToHashSet();
                var serverIds = Context.UserWordPairs.WhereUser(userId).Select(d => d.UserWordPairId).ToHashSet();

                IEnumerable<int> wordsToAdd = serverIds.Except(clientIds);

                IEnumerable<int> wordsToDelete = clientIds.Except(serverIds);
                reply.ToDelete.Add(wordsToDelete);


                var wordReplies = Context.UserWordPairs
                    .Where(u => wordsToAdd.Any(w => w == u.UserWordPairId))
                    .Include(d => d.WordPair)
                    .ThenInclude(w => w.WordForeign)
                    .Include(d => d.WordPair.WordNative)
                    .Select(u => new
                    {
                        u.UserWordPairId,
                        u.WordPair.WordForeign,
                        u.WordPair.WordNative,
                        u.IsInvertPair,
                        u.LearningPeriod
                    }).AsNoTracking();

                var wordReply = wordReplies.Select(w => new WordReply()
                {
                    UserWordPair = w.UserWordPairId,
                    WordNative = w.IsInvertPair ? w.WordNative.Content : w.WordForeign.Content,
                    WordForeign = w.IsInvertPair ? w.WordForeign.Content : w.WordNative.Content,
                    Period = w.LearningPeriod
                });
                reply.ToAdd.Add(wordReply);

                return reply;
            });
        }
    }
}
