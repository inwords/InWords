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
            var levelsToSave = gameLevels.Where(d => d.GameLevelId == 0).ToList();

            var list = levelsToSave.Select(d => d.LevelWords()).ToList();
            var levelsIds = await context.CreateLevels(userId, list).ConfigureAwait(false);

            for (int i = 0; i < levelsToSave.Count; i++)
            {
                levelsToSave[i].GameLevelId = levelsIds[i];
            }

            return gameLevels;
        }
    }
}
