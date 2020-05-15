using InWords.Common.Extensions;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.WebApi.Business.GameEvaluator.Enum;
using InWords.WebApi.Business.GameEvaluator.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Business.GameEvaluator.Game
{
    public class CardGameLevel : BaseGameLevel
    {
        private bool chached = false;
        private readonly IList<WordKnowledge> wordKnowledges;
        public CardGameLevel(int gameLevelId, IDictionary<int, int> metrics) : base(gameLevelId, metrics)
        {
            wordKnowledges = new List<WordKnowledge>();
        }

        public override float Complexity => .8f;

        public override GameType Type => GameType.ClassicCardGame;

        public override IList<WordKnowledge> Qualify()
        {
            if (chached) return wordKnowledges;
            chached = true;
            WordIdOpenCount.ForEach((metric) =>
            {
                WordKnowledge wordKnowledge = new WordKnowledge(metric.Key, FromMetric(metric.Value), Complexity);
                wordKnowledges.Add(wordKnowledge);
            });
            return wordKnowledges;
        }

        public override LevelScore Score()
        {
            int bestCase = WordIdOpenCount.Count * 4 - 2;
            int currentCase = WordIdOpenCount.Sum(s => s.Value);
            int score = StarasFunction(bestCase, currentCase);
            return new LevelScore(GameLevelId, score, Type);
        }

        private MemoryLevel FromMetric(int openCount) => openCount switch
        {
            var o when o <= 4 => MemoryLevel.WellKnown,
            5 => MemoryLevel.Known,
            _ => MemoryLevel.Unknown,
        };
    }
}
