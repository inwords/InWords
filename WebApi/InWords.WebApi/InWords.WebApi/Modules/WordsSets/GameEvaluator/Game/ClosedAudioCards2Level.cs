using InWords.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets.GameEvaluator.Game
{
    public class ClosedAudioCards2Level : BaseClosedCardLevel
    {
        public ClosedAudioCards2Level(int gameLevelId, IDictionary<int, int> wordIdOpenCount) : base(gameLevelId, wordIdOpenCount)
        {
        }

        public override GameType Type => GameType.ClosedAudioCards2;
    }
}
