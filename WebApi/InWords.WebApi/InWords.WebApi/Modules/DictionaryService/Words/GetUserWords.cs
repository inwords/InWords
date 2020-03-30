using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Extensions.InWordsDataContext;
using InWords.WebApi.Services.Abstractions;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryService.Words
{
    public class GetUserWords : AuthorizedRequestObjectHandler<GetWordsRequest, WordsReply, InWordsDataContext>
    {
        public GetUserWords(InWordsDataContext context) : base(context)
        {
        }

        [SuppressMessage("Design", "CA1062:Проверить аргументы или открытые методы", Justification = "<Ожидание>")]
        public override async Task<WordsReply> HandleRequest(AuthorizedRequestObject<GetWordsRequest, WordsReply> request,
            CancellationToken cancellationToken = default)
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
                .Where(u => wordsToAdd.Any(w => w == u.UserWordPairId) && !u.Backgound)
                .Select(w => new WordReply()
                {
                    Period = w.LearningPeriod,
                    WordForeign = w.ForeignWord,
                    WordNative = w.NativeWord,
                    UserWordPair = w.UserWordPairId
                }).ToList();

            reply.ToAdd.AddRange(wordReplies);
            return reply;
        }
    }
}
