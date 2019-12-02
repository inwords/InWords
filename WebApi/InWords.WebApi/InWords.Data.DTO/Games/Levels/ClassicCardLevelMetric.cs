using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using InWords.Data.DTO.Abstractions;

namespace InWords.Data.DTO.Games.Levels
{
    public class ClassicCardLevelMetric : ILevelScore
    {
        public int GameLevelId { get; set; }
        public Dictionary<int, int> UserWordPairIdOpenCounts { get; set; }
        public int Score()
        {
            var score = 0;
            int wordsCount = UserWordPairIdOpenCounts.Count * 2;
            int openingQuantity = UserWordPairIdOpenCounts.Sum(s => s.Value);
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
