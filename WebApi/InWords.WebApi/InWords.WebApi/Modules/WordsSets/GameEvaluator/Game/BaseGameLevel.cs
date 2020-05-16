using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.WebApi.Business.GameEvaluator.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InWords.WebApi.Business.GameEvaluator.Game
{
    public abstract class BaseGameLevel : IGameLevel
    {
        public int GameLevelId { get; set; }
        public IDictionary<int, int> WordIdOpenCount { get; }
        public BaseGameLevel(int gameLevelId, IDictionary<int, int> wordIdOpenCount)
        {
            GameLevelId = gameLevelId;
            WordIdOpenCount = wordIdOpenCount;
        }
        public abstract GameType Type { get; }
        public abstract LevelScore Score();
        public abstract IList<WordKnowledge> Qualify();
        public int[] LevelWords() => WordIdOpenCount.Keys.ToArray();
        protected static int StarasFunction(int bestCase, int currentCase)
        {
            double status = -Math.Pow(currentCase - bestCase, 2) / (2.5 * bestCase) + UserGameLevel.MAXSTARS;
            int score = Math.Min((int)Math.Floor(status), UserGameLevel.MAXSTARS);
            score = Math.Max(UserGameLevel.MINSTARS, score);
            return score;
        }

        private static readonly Dictionary<GameType, float> complexity = new Dictionary<GameType, float>
        {
            {GameType.Unknown, 0f},
            {GameType.Total, 0f},

            {GameType.AudioGame, 0.1f},
            {GameType.ClassicCardGame, 0.8f}
        };
        public static float GetComplexity(GameType gameType)
        {
            return complexity[gameType];
        }

    }
}
