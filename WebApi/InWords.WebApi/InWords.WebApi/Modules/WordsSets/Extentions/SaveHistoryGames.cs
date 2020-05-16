using InWords.Data;
using InWords.WebApi.Business.GameEvaluator.Game;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets.Extentions
{
    public static class SaveHistoryGames
    {
        public static async Task<IList<IGameLevel>> SaveCustomLevels(
            this IList<IGameLevel> gameLevels, InWordsDataContext context, int userId)
        {
            var levelsToSave = gameLevels.Where(d => d.GameLevelId <= 0)
                .GroupBy(d => d.GameLevelId, d => d)
                .ToDictionary(d => d.Key,
                d => d.ToArray());

            var list = levelsToSave
                .Select(d => d.Value
                .SelectMany(d => d.LevelWords()
                    .Distinct())
                    .ToArray())
                .ToList();

            var levelsIds = await context.CreateLevels(userId, list).ConfigureAwait(false);

            int i = 0;
            foreach (var level in levelsToSave)
            {
                foreach (var type in level.Value)
                {
                    type.GameLevelId = levelsIds[i];
                }
                i++;
            }

            return gameLevels;
        }
    }
}
