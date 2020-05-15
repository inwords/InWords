using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.WebApi.Business.GameEvaluator.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.WebApi.Business.GameEvaluator.Game
{
    public abstract class BaseGameLevel : IGameLevel
    {
        public int GameLevelId { get; protected set; }

        public BaseGameLevel(int gameLevelId)
        {
            GameLevelId = gameLevelId;
        }

        public abstract float Complexity { get; }

        public abstract GameType Type { get; }

        public abstract LevelScore Score();

        public abstract IList<WordKnowledge> Qualify();

        protected static int StarasFunction(int bestCase, int currentCase)
        {
            double status = -Math.Pow(currentCase - bestCase, 2) / (2.5 * bestCase) + UserGameLevel.MAXSTARS;
            int score = Math.Min((int)Math.Floor(status), UserGameLevel.MAXSTARS);
            score = Math.Max(UserGameLevel.MINSTARS, score);
            return score;
        }
    }
}
