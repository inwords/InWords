using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.WordsSets.GetWords
{
    public class GetMarkedWordsHandler
        : AuthorizedRequestObjectHandler<WordSetWordsRequest, WordSetWordsReply, InWordsDataContext>
    {
        public GetMarkedWordsHandler(InWordsDataContext context) : base(context)
        {
        }

        public override Task<WordSetWordsReply> HandleRequest(
            AuthorizedRequestObject<WordSetWordsRequest, WordSetWordsReply> request,
            CancellationToken cancellationToken = default)
        {
            return Task.Run(() =>
            {

                if (request == null)
                    throw new ArgumentNullException($"{request} is null");

                int userId = request.UserId;
                WordSetWordsRequest requestData = request.Value;

                // usersWords
                var usersWords = Context.UserWordPairs.Where(u => u.UserId.Equals(userId));
                // levels in game
                var levelsInSet = Context.GameLevels.Where(g => g.GameId.Equals(requestData.WordSetId));
                var wordsIdInLevels = Context.GameLevelWords.Where(n => levelsInSet.Any(d => d.GameLevelId.Equals(n.GameLevelId)));
                var wordsByWordIds = Context.WordPairs.Where(w => wordsIdInLevels.Any(d => d.WordPairId.Equals(w.WordPairId)));
                var loadedWords = wordsByWordIds
                    .Include(d => d.WordForeign)
                    .Include(w => w.WordNative)
                    .Select(wp => new WordSetWord()
                    {
                        WordPairId = wp.WordPairId,
                        WordForeign = wp.WordForeign.Content,
                        WordNative = wp.WordNative.Content,
                        HasAdded = usersWords.Any(d => d.WordPairId.Equals(wp.WordPairId))
                    });

                WordSetWordsReply wordSetWordsReply = new WordSetWordsReply();
                wordSetWordsReply.Words.AddRange(loadedWords);

                return wordSetWordsReply;
            });
        }
    }
}
