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
    public class AudioGameLevel : BaseGameLevel
    {
        private bool chached;
        private readonly IList<WordKnowledge> wordKnowledges;
        private readonly IDictionary<int, int> wordIdOpenCount;
        public AudioGameLevel(int gameLevelId, IDictionary<int, int> wordIdOpenCount) : base(gameLevelId)
        {
            this.wordIdOpenCount = wordIdOpenCount;
            this.wordKnowledges = new List<WordKnowledge>();
        }

        public override float Complexity => .1f;

        public override GameType Type => GameType.AudioGame;

        public override IList<WordKnowledge> Qualify()
        {
            if (chached) return wordKnowledges;
            chached = true;
            wordIdOpenCount.ForEach((metric) =>
            {
                WordKnowledge wordKnowledge = new WordKnowledge(metric.Key, FromMetric(metric.Value), Complexity);
                wordKnowledges.Add(wordKnowledge);
            });
            return wordKnowledges;
        }

        private MemoryLevel FromMetric(int value) => value switch
        {
            var o when o <= 1 => MemoryLevel.WellKnown,
            _ => MemoryLevel.Unknown,
        };

        public override LevelScore Score()
        {
            float status = (float)wordIdOpenCount.Count / wordIdOpenCount.Sum(s => s.Value) * UserGameLevel.MAXSTARS;
            int score = (int)Math.Floor(status);
            return new LevelScore(GameLevelId, score, Type);
        }
    }
}
