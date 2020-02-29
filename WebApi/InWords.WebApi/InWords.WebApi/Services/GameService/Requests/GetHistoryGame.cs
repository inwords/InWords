using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Enums;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameService.Requests
{
    public class GetHistoryGame
    {
        private readonly InWordsDataContext context;
        public GetHistoryGame(InWordsDataContext context)
        {
            this.context = context;
        }

        public async Task<Game> HandleAsync(int userId)
        {
            Game historyGame = FindHistoryGame(userId);
            // Create if not exist
            if (!(historyGame is null)) return historyGame;

            historyGame = new Game { CreatorId = userId };
            context.Games.Add(historyGame);
            await context.SaveChangesAsync().ConfigureAwait(false);
            var tag = new GameTag
            {
                Tags = GameTags.CustomLevelsHistory,
                UserId = userId,
                GameId = historyGame.GameId
            };
            context.GameTags.Add(tag);
            await context.SaveChangesAsync().ConfigureAwait(false);

            return historyGame;
        }

        private Game FindHistoryGame(int userId)
        {
            return (from gameTags in context.GameTags
                    where gameTags.Tags.Equals(GameTags.CustomLevelsHistory) && gameTags.UserId.Equals(userId)
                    join game in context.Games on gameTags.GameId equals game.GameId
                    select game).AsNoTracking().SingleOrDefault();
        }
    }
}
