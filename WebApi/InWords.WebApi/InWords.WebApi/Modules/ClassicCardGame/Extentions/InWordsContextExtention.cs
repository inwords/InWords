using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.DTO.GameBox;
using InWords.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.ClassicCardGame.Extentions
{
    public static class InWordsContextExtention
    {
        public static async Task<int> AddOrGetUserHistoryGame(this InWordsDataContext context, int userId)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            var historyGame = (from game in context.Games.Where(d => d.CreatorId == userId)
                               join tag in context.GameTags.Where(d => d.Tags == GameTags.CustomLevelsHistory)
                               on game.GameId equals tag.GameId
                               select game).OrderBy(g => g.GameId).ToArray();

            int historyGameId = 0;
            if (historyGame.Any())
            {
                historyGameId = historyGame[0].GameId;

                if (historyGame.Length > 1)
                {
                    var historyCollisions = historyGame.Skip(1);

                    int[] ids = historyCollisions.Select(d => d.GameId).ToArray();
                    var levels = context.GameLevels.Where(g => ids.Contains(g.GameId));

                    levels.ForEach(level =>
                    {
                        level.GameId = historyGameId;
                    });
                    await context.SaveChangesAsync().ConfigureAwait(false);

                    context.Remove(historyCollisions);
                    await context.SaveChangesAsync().ConfigureAwait(false);
                }
            }
            else
            {
                Game game = new Game
                {
                    CreatorId = userId
                };
                context.Add(game);
                await context.SaveChangesAsync().ConfigureAwait(false);
                GameTag historyGameTag = new GameTag()
                {
                    GameId = game.GameId,
                    Tags = GameTags.CustomLevelsHistory,
                    UserId = userId
                };

                context.Add(historyGameTag);
                await context.SaveChangesAsync().ConfigureAwait(false);

                historyGameId = game.GameId;
            }
            return historyGameId;
        }
    }
}
