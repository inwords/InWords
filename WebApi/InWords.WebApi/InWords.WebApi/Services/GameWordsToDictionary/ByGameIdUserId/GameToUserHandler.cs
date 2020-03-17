using InWords.Data;
using InWords.Data.Domains;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId
{
    public class GameToUserHandler : IRequestHandler<GameToUserQuery, GameToUserQueryResult>
    {
        private readonly InWordsDataContext context;

        public GameToUserHandler(InWordsDataContext context)
        {
            this.context = context;
        }

        public async Task<GameToUserQueryResult> Handle(GameToUserQuery request,
            CancellationToken cancellationToken = default)
        {
            // find user word pairs
            IQueryable<UserWordPair> userWordPairs = FindUserWordPairs(request);

            // add to user words
            await context.UserWordPairs.AddRangeAsync(userWordPairs, cancellationToken).ConfigureAwait(false);

            // cache changes count
            int count = await context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            // return count
            return new GameToUserQueryResult
            {
                WordsAdded = count
            };
        }

        private IQueryable<UserWordPair> FindUserWordPairs(GameToUserQuery request)
        {
            // find words
            IQueryable<int> wordsId = context.WordsInGame(request.CreationId);

            // find user words
            IQueryable<int> userWords = UserWords(context.UserWordPairs, request.UserId);

            // exclude existing words
            wordsId = wordsId.Where(w => !userWords.Any(u => u.Equals(w)));

            return SelectUserWordPairs(request, wordsId); ;
        }

        private static IQueryable<UserWordPair> SelectUserWordPairs(GameToUserQuery request, IQueryable<int> wordsId)
        {
            return wordsId.Select(w =>
                new UserWordPair
                {
                    WordPairId = w,
                    // TODO: Configure isinverted word pair
                    UserId = request.UserId
                });
        }

        private IQueryable<int> UserWords(DbSet<UserWordPair> userWordPairs, int userId)
        {
            return userWordPairs.Where(u => u.UserId.Equals(userId)).Select(d => d.WordPairId);
        }
    }
}