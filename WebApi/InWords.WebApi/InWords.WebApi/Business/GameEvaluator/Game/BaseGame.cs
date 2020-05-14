using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.WebApi.Business.GameEvaluator.Game
{
    public abstract class BaseGame : IGame
    {
        protected Dictionary<int, int> WordIdOpenCount { get; set; }
        public BaseGame()
        {
            WordIdOpenCount = new Dictionary<int, int>();
        }
        public abstract void Qualify();

        public abstract void Score();
    }
}
