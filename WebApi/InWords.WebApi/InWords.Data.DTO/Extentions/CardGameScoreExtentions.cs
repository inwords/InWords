using System.Linq;
using InWords.Data.DTO.GameBox.LevelMetric;

namespace InWords.Data.DTO.Extentions
{
    public static class CardGameScoreExtentions
    {
        public static LevelResult ToLevelResult(this CardGameScore cardGameScore)
        {
            var levelResult = new LevelResult
            {
                LevelId = cardGameScore.GameLevelId,
                OpeningQuantity = cardGameScore.WordPairIdOpenCounts.Sum(s => s.Value),
                WordsCount = cardGameScore.WordPairIdOpenCounts.Count * 2
            };
            return levelResult;
        }
    }
}