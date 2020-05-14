using InWords.Protobuf;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Modules.ClassicCardGame.Extentions
{
    public static class ClassicCardExtentions
    {
        public static Dictionary<int, int> LevelStars(this CardGameMetrics cardGameMetrics)
        {
            if (cardGameMetrics == null)
                throw new ArgumentNullException(nameof(cardGameMetrics));

            Dictionary<int, int> levelScore = new Dictionary<int, int>(cardGameMetrics.Metrics.Count);

            foreach (var metric in cardGameMetrics.Metrics)
            {
                var score = CalculateScore(metric.WordIdOpenCount);
                if (levelScore.ContainsKey(metric.GameLevelId))
                {
                    if (score > levelScore[metric.GameLevelId])
                        levelScore[metric.GameLevelId] = score;
                }
                else
                {
                    levelScore.Add(metric.GameLevelId, score);
                }
            }
            return levelScore;
        }

        private static int CalculateScore(IDictionary<int, int> WordPairIdOpenCounts)
        {
            var score = 0;
            int wordsCount = WordPairIdOpenCounts.Count * 2;
            int openingQuantity = WordPairIdOpenCounts.Sum(s => s.Value);
            int bestOpeningsCount = wordsCount * 2 - 2;
            if (openingQuantity <= bestOpeningsCount)
                score = 3;
            else if (openingQuantity <= wordsCount * 2.25)
                score = 2;
            else if (openingQuantity <= wordsCount * 2.5) score = 1;
            return score;
        }
    }
}
