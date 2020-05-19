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
    public class OpenCardGameLevel : BaseGameLevel
    {
        private bool chached = false;
        private readonly IList<WordKnowledge> wordKnowledges;
        public OpenCardGameLevel(int gameLevelId, IDictionary<int, int> metrics) : base(gameLevelId, metrics)
        {
            wordKnowledges = new List<WordKnowledge>();
        }

        public override GameType Type => GameType.OpenCardGame;

        public override IList<WordKnowledge> Qualify()
        {
            if (chached) return wordKnowledges;
            chached = true;
            WordIdOpenCount.ForEach((metric) =>
            {
                WordKnowledge wordKnowledge = new WordKnowledge(metric.Key, FromMetric(metric.Value), GetComplexity(Type));
                wordKnowledges.Add(wordKnowledge);
            });
            return wordKnowledges;
        }

        public override LevelScore Score()
        {
            int bestCase = WordIdOpenCount.Count * 2;
            int currentCase = WordIdOpenCount.Sum(s => s.Value);
            int score = StarasFunction(bestCase, currentCase);
            return new LevelScore(GameLevelId, score, Type);
        }

        private MemoryLevel FromMetric(int openCount) => openCount switch
        {
            var o when o <= 2 => MemoryLevel.WellKnown,
            3 => MemoryLevel.Known,
            _ => MemoryLevel.Unknown,
        };
    }
}
