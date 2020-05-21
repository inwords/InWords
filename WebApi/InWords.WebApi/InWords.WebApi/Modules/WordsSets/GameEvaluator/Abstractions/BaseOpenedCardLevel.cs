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
    public abstract class BaseOpenedCardLevel : BaseGameLevel
    {
        public BaseOpenedCardLevel(int gameLevelId, IDictionary<int, int> wordIdOpenCount) 
            : base(gameLevelId, wordIdOpenCount)
        {  }

        public override LevelScore Score()
        {
            int bestCase = WordIdOpenCount.Count * 2;
            int currentCase = WordIdOpenCount.Sum(s => s.Value);
            int score = StarasFunction(bestCase, currentCase);
            return new LevelScore(GameLevelId, score, Type);
        }

        public override MemoryLevel LevelFromMetric(int openCounts) => openCounts switch
        {
            var o when o <= 2 => MemoryLevel.WellKnown,
            3 => MemoryLevel.Known,
            _ => MemoryLevel.Unknown,
        };
    }
}
