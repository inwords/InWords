using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Common.GameEvaluator.Game
{
    public class AudioGame : BaseGame
    {
        public AudioGame(Dictionary<int,int> metrics)
        {
            this.WordIdOpenCount = metrics;
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
