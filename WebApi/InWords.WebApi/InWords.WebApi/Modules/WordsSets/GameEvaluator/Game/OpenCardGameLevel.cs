using InWords.Common.Extensions;
using InWords.Data.Enums;
using InWords.WebApi.Business.GameEvaluator.Enum;
using InWords.WebApi.Business.GameEvaluator.Game;
using InWords.WebApi.Business.GameEvaluator.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets.GameEvaluator.Game
{
    public class OpenCardGameLevel : BaseOpenedCardLevel
    {
        public OpenCardGameLevel(int gameLevelId, IDictionary<int, int> metrics) : base(gameLevelId, metrics) {  }

        public override GameType Type => GameType.OpenedCardGame;
    }
}
