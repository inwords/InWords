using System.Linq;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Enums;

namespace InWords.WebApi.Services.GameService.Requests
{
    public class GetHistoryGame
    {
        private readonly InWordsDataContext context;
        public GetHistoryGame(InWordsDataContext context)
        {
            this.context = context;
        }

        public async Task<Creation> Handle(int userId)
        {
            Creation historyGame = FindHistoryGame();
            // Create if not exist
            if (historyGame is null)
            {
                historyGame = new Creation { CreatorId = userId };
                context.Creations.Add(historyGame);
                await context.SaveChangesAsync().ConfigureAwait(false);
                var tag = new GameTag
                {
                    Tags = GameTags.CustomLevelsHistory,
                    UserId = userId,
                    GameId = historyGame.CreationId
                };
                context.GameTags.Add(tag);
                await context.SaveChangesAsync().ConfigureAwait(false);
            }

            return historyGame;
        }

        private Creation FindHistoryGame()
        {
            return (from gameTags in context.GameTags
                    where gameTags.Tags.Equals(GameTags.CustomLevelsHistory)
                    join game in context.Creations on gameTags.GameId equals game.CreationId
                    select game).SingleOrDefault();
        }
    }
}
