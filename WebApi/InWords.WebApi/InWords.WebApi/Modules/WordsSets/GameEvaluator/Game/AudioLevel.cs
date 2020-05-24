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
    public class AudioLevel : BaseGameLevel
    {
        public AudioLevel(int gameLevelId, IDictionary<int, int> wordIdOpenCount)
            : base(gameLevelId, wordIdOpenCount)
        { }

        public override GameType Type => GameType.OpenedAudioCards;

        public override MemoryLevel LevelFromMetric(int openCounts) => openCounts switch
        {
            var o when o <= 1 => MemoryLevel.WellKnown,
            _ => MemoryLevel.Unknown,
        };

        public override LevelScore Score()
        {
            int bestCase = WordIdOpenCount.Count;
            int currentCase = WordIdOpenCount.Sum(s => s.Value);
            int score = StarasFunction(bestCase, currentCase);
            return new LevelScore(GameLevelId, score, Type);
        }
    }
}
