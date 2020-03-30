using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetLevelWords
        : AuthorizedRequestObjectHandler<GetLevelWordsRequest, GetLevelWordsReply, InWordsDataContext>
    {
        public GetLevelWords(InWordsDataContext context) : base(context)
        {
        }

        public override async Task<GetLevelWordsReply> HandleRequest(
            AuthorizedRequestObject<GetLevelWordsRequest, GetLevelWordsReply> request, CancellationToken cancellationToken = default)
        {
            var userId = request.UserId;
            var data = request.Value;
            var levelWordsReply = new GetLevelWordsReply();

            // return add existed words
            var words = Context.GameLevelWords.Where(d => d.GameLevelId == data.LevelId);
            var userWords = Context.UserWordPairs.Where(d => d.UserId == userId);

            var existed = (from word in words
                           from uword in userWords
                           where word.ForeignWord == uword.ForeignWord
                           && word.NativeWord == uword.NativeWord
                           select new
                           {
                               word.GameLevelWordId,
                               Word = new LevelWord()
                               {
                                   ForeignWord = uword.ForeignWord,
                                   NativeWord = uword.NativeWord,
                                   UserWordPairId = uword.UserWordPairId
                               }
                           }).ToArray();

            levelWordsReply.Words.AddRange(existed.Select(e => e.Word));

            // add not existed words
            int[] existedGameLevelWordsIds = existed
                .Select(d => d.GameLevelWordId)
                .ToArray();

            var wordsToAdd = Context.GameLevelWords
                .Where(d => d.GameLevelId == data.LevelId && !existedGameLevelWordsIds.Any(e => e == d.GameLevelWordId))
                .ToArray();

            var uwp = wordsToAdd.Select(u => new UserWordPair()
            {
                ForeignWord = u.ForeignWord,
                NativeWord = u.NativeWord,
                Background = true,
                UserId = userId
            }).ToArray();

            uwp.ForEach((u) =>
            {
                Context.UserWordPairs.Add(u);
            });

            await Context.SaveChangesAsync().ConfigureAwait(false);

            var addedLevelWords = uwp.Select(d => new LevelWord()
            {
                ForeignWord = d.ForeignWord,
                NativeWord = d.NativeWord,
                UserWordPairId = d.UserWordPairId
            });

            levelWordsReply.Words.AddRange(addedLevelWords);

            return levelWordsReply;
        }
    }
}
