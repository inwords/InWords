using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetMarkedWordsHandler
        : AuthReqHandler<WordSetWordsRequest, WordSetWordsReply, InWordsDataContext>
    {
        public GetMarkedWordsHandler(InWordsDataContext context) : base(context)
        {
        }

        public override Task<WordSetWordsReply> HandleRequest(
            AuthReq<WordSetWordsRequest, WordSetWordsReply> request,
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
                var wordsIdInLevels = Context.GameLevelWords
                .Where(n => levelsInSet.Any(d => d.GameLevelId.Equals(n.GameLevelId)))
                .Select(w => new WordSetWord()
                {
                    WordForeign = w.ForeignWord,
                    WordNative = w.NativeWord,
                    WordPairId = w.GameLevelWordId,
                    HasAdded = Context.UserWordPairs.Where(u => u.UserId == userId).Any(c => c.ForeignWord == w.ForeignWord && c.NativeWord == w.NativeWord)
                });

                WordSetWordsReply wordSetWordsReply = new WordSetWordsReply();
                wordSetWordsReply.Words.AddRange(wordsIdInLevels);

                return wordSetWordsReply;
            });
        }
    }
}
