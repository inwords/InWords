using InWords.Data.Enums;
using InWords.WebApi.Business.GameEvaluator.Enum;
using InWords.WebApi.Business.GameEvaluator.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.WebApi.Business.GameEvaluator.Game
{
    public interface IGameLevel
    {
        int GameLevelId { get; set; }
        GameType Type { get; }
        LevelScore Score();
        IList<WordKnowledge> Qualify();
        int[] LevelWords();
    }
}
