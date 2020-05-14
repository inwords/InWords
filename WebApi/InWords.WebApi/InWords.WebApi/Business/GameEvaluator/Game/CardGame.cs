using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.WebApi.Business.GameEvaluator.Game
{
    public class CardGame : BaseGame
    {
        public CardGame(Dictionary<int, int> metrics)
        {
            WordIdOpenCount = metrics;
        }
        public override void Qualify()
        {
            throw new NotImplementedException();
        }

        public override void Score()
        {
            throw new NotImplementedException();
        }
    }
}
