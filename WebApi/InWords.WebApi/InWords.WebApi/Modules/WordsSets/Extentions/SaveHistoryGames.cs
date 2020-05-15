using Google.Protobuf.Collections;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Business.GameEvaluator.Game;
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
            this IList<IGameLevel> gameLevels, InWordsDataContext context, int userId)
        {

            throw new NotImplementedException();
        }
    }
}
