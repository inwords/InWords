using InWords.Data.Enums;
using InWords.WebApi.Business.GameEvaluator.Game;
using InWords.WebApi.Business.GameEvaluator.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets.GameEvaluator.Game
{
    public class ClosedAudioCardsLevel : BaseClosedCardLevel
    {
        public ClosedAudioCardsLevel(int gameLevelId, IDictionary<int, int> wordIdOpenCount) : base(gameLevelId, wordIdOpenCount)
        {
        }

        public override GameType Type => GameType.ClosedAudioCards;
    }
}
