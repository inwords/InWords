using System.Linq;
using InWords.Data.DTO.GameBox.LevelMetric;

namespace InWords.Data.DTO.Extentions
{
    public static class CardGameScoreExtentions
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