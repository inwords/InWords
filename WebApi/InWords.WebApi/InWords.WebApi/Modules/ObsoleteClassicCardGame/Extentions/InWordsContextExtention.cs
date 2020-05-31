using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains.Game;
using InWords.Data.Enums;
using InWords.WebApi.Extensions.InWordsDataContextExtention;
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

        public static async Task<int[]> CreateLevels(this InWordsDataContext context, int gameId, int userId, IList<int[]> pairsInLevels)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            if (pairsInLevels == null)
                pairsInLevels = Array.Empty<int[]>();

            // create levles
            var levels = pairsInLevels.Select(d =>
            {
                var game = new GameLevel()
                {
                    GameId = gameId
                };
                game.Historylevel = new Historylevel()
                {
                    DateTime = DateTime.UtcNow,
                    WordsCount = d.Distinct().Count(),
                    GameLevel = game
                };
                context.Add(game);
                return game;
            }).ToArray();

            await context.SaveChangesAsync().ConfigureAwait(false);

            // fill levels with words
            for (int i = 0; i < pairsInLevels.Count; i++)
            {
                var currentLevel = levels[i];
                int[] currentWordsIds = pairsInLevels[i].ToArray();

                var currentWords = context.CurrentUserWordPairs(userId)
                    .Where(u => currentWordsIds.Contains(u.UserWordPairId))
                    .ToArray();

                var gameLevelWords = currentWords.Select(w => new GameLevelWord()
                {
                    ForeignWord = w.ForeignWord,
                    NativeWord = w.NativeWord,
                    GameLevelId = currentLevel.GameLevelId,
                }).ToArray();

                context.GameLevelWords.AddRange(gameLevelWords);
            }
            await context.SaveChangesAsync().ConfigureAwait(false);

            return levels.Select(level => level.GameLevelId).ToArray();
        }

        /// <summary>
        /// GetOrAdd history usergame and save levels in game levels. Return levels ids.
        /// </summary>
        /// <param name="context">database context</param>
        /// <param name="userId">auhtorized user identity</param>
        /// <param name="levelsWords">words id array in list of levels</param>
        /// <returns>Levels ids</returns>
        public static async Task<int[]> CreateLevels(this InWordsDataContext context, int userId, IList<int[]> levelsWords)
        {
            var historyGameId = await context.AddOrGetUserHistoryGame(userId).ConfigureAwait(false);
            var levels = await context.CreateLevels(historyGameId, userId, levelsWords).ConfigureAwait(false);
            return levels;
        }
    }
}
