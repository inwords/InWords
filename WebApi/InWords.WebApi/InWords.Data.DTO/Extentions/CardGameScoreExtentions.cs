using InWords.Data.DTO.GameBox.LevelMetric;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InWords.Data.DTO.Extentions
{
    public static class CardGameScoreExtentions
    {
        public static LevelResult ToLevelResult(this CardGameScore cardGameScore)
        {
            LevelResult levelResult = new LevelResult()
            {
                LevelId = cardGameScore.GameLevelId,
                OpeningQuantity = cardGameScore.WordPairIdOpenCounts.Sum(s => s.Value),
                WordsCount = cardGameScore.WordPairIdOpenCounts.Count * 2
            };
            return levelResult;
        }
    }
}
