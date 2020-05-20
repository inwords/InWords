using InWords.Common.Extensions;
using InWords.Data.Enums;
using InWords.WebApi.Business.GameEvaluator.Enum;
using InWords.WebApi.Business.GameEvaluator.Model;
using InWords.WebApi.Modules.WordsSets.GameEvaluator.Game;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Business.GameEvaluator.Game
{
    public class ClosedCardsLevel : BaseClosedCardLevel
    {
        public ClosedCardsLevel(int gameLevelId, IDictionary<int, int> metrics)
            : base(gameLevelId, metrics) { }
        public override GameType Type => GameType.ClosedCards;
    }
}
