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
    public abstract class BaseGameLevel : IGameLevel
    {
        private bool chached = false;
        private readonly IList<WordKnowledge> wordKnowledges;
        public int GameLevelId { get; set; }
        public IDictionary<int, int> WordIdOpenCount { get; }
        public abstract GameType Type { get; }
        public BaseGameLevel(int gameLevelId, IDictionary<int, int> wordIdOpenCount)
        {
            GameLevelId = gameLevelId;
            wordKnowledges = new List<WordKnowledge>();
            WordIdOpenCount = wordIdOpenCount;
        }
        public virtual LevelScore Score() 
        {
            int bestCase = WordIdOpenCount.Count * 4 - 2;
            int currentCase = WordIdOpenCount.Sum(s => s.Value);
            int score = StarasFunction(bestCase, currentCase);
            return new LevelScore(GameLevelId, score, Type);
        }
        public int[] LevelWords() => WordIdOpenCount.Keys.ToArray();
        public virtual IList<WordKnowledge> Qualify()
        {
            if (chached) return wordKnowledges;
            chached = true;
            WordIdOpenCount.ForEach((metric) =>
            {
                WordKnowledge wordKnowledge = new WordKnowledge(metric.Key, LevelFromMetric(metric.Value), GetComplexity(Type));
                wordKnowledges.Add(wordKnowledge);
            });
            return wordKnowledges;
        }
        public virtual MemoryLevel LevelFromMetric(int openCounts) => openCounts switch
        {
            var o when o <= 4 => MemoryLevel.WellKnown,
            5 => MemoryLevel.Known,
            _ => MemoryLevel.Unknown,
        };
        public static float GetComplexity(GameType gameType)
        {
            return complexity[gameType];
        }
        protected static int StarasFunction(int bestCase, int currentCase)
        {
            currentCase = Math.Max(bestCase, currentCase);
            double status = -Math.Pow(currentCase - bestCase, 2) / (2.5 * bestCase) + UserGameLevel.MAXSTARS;
            int score = Math.Min((int)Math.Floor(status), UserGameLevel.MAXSTARS);
            score = Math.Max(UserGameLevel.MINSTARS, score);
            return score;
        }

        private static readonly Dictionary<GameType, float> complexity = new Dictionary<GameType, float>
        {
            {GameType.Unknown, 0f},
            {GameType.Total, 0f},

            {GameType.ClosedAudioCards, 0.7f},
            {GameType.ClosedCards, 0.8f},
            {GameType.ClosedAudioCards2, 0.9f},

            {GameType.OpenedCardGame, 0.3f},
            {GameType.OpenedAudioCards, 0.4f},
            {GameType.OpenedAudioCards2, 0.5f},
            
            {GameType.Audio, 0.1f},
        };
    }
}
