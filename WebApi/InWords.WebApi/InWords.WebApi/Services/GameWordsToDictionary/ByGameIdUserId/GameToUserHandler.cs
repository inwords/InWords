using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId
{
    public class GameToUserHandler : IRequestHandler<GameToUserQuery, GameToUserQueryResult>
    {
        private readonly InWordsDataContext context;
        public GameToUserHandler(InWordsDataContext context)
        {
            this.context = context;
        }
        public async Task<GameToUserQueryResult> Handle(GameToUserQuery request, CancellationToken cancellationToken)
        {
            // find words
            IQueryable<int> wordsId = context.WordsInGame(request.CreationId);

            // exclude existing words
            IQueryable<int> userWords = UserWords(context.UserWordPairs, request.UserId);
            wordsId = wordsId.Except(userWords);

            IQueryable<UserWordPair> userWordPairs = wordsId.Select(w =>
                new UserWordPair()
                {
                    WordPairId = w,
                    UserId = request.UserId
                });

            // add to user words
            await context.UserWordPairs.AddRangeAsync(userWordPairs, cancellationToken).ConfigureAwait(false);

            // return count
            return new GameToUserQueryResult()
            {
                WordsAdded = wordsId.Count()
            };
        }

        private IQueryable<int> UserWords(DbSet<UserWordPair> userWordPairs, int userId)
        {
            return userWordPairs.Where(u => u.UserId.Equals(userId)).Select(d => d.WordPairId);
        }
    }
}
