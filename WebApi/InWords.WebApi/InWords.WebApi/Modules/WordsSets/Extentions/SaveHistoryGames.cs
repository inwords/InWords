using Google.Protobuf.Collections;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static InWords.Protobuf.TrainingDataRequest.Types;

namespace InWords.WebApi.Modules.WordsSets.Extentions
{
    public static class SaveHistoryGames
    {
        public static async Task<RepeatedField<Training>> SaveCustomTraining(
            this RepeatedField<Training> metrics, InWordsDataContext context, int userId)
        {
            var historyGames = metrics.Where(d => d.GameLevelId == default).ToArray();
            var levelsToCreate = historyGames
                .Select(
                d => d.CardsMetric.WordIdOpenCount.Select(d => d.Key)
                .Union(d.AuditionMetric.WordIdOpenCount.Select(d => d.Key))
                // union with others levles types
                .ToArray()).ToList();
            var createdIds = await context.CreateLevels(userId, levelsToCreate).ConfigureAwait(false);

            for (int i = 0; i < historyGames.Length; i++)
            {
                historyGames[i].GameLevelId = createdIds[i];
            }

            return metrics;
        }
    }
}
