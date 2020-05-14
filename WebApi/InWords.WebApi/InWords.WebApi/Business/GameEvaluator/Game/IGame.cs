using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.WebApi.Business.GameEvaluator.Game
{
    public interface IGame
    {
        void Score();
        void Qualify();
    }
}
