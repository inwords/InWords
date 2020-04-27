using InWords.Data.DTO.GameBox.LevelMetric;
using System;
using System.Linq;

namespace InWords.Data.DTO.Extensions
{
    [Obsolete]
    public static class CardLevelMetricExtension
    {
        public static LevelResult ToLevelResult(this LevelMetricQuery levelMetricQuery)
        {
            var levelResult = new LevelResult
            {
                LevelId = levelMetricQuery.GameLevelId,
                OpeningQuantity = levelMetricQuery.WordPairIdOpenCounts.Sum(s => s.Value),
                WordsCount = levelMetricQuery.WordPairIdOpenCounts.Count * 2
            };
            return levelResult;
        }
    }
}