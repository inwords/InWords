using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InWords.Data.DTO.GameBox.LevelMetric
{
    public class CardGameScore
    {
        public int GameLevelId { get; set; }
        public Dictionary<int, int> WordPairIdOpenCounts { get; set; }

        public LevelResult LevelResult
        {
            get
            {
                LevelResult levelResult = new LevelResult()
                {
                    LevelId = GameLevelId,
                    OpeningQuantity = WordPairIdOpenCounts.Sum(s => s.Value),
                    WordsCount = WordPairIdOpenCounts.Count * 2
                };
                return LevelResult;
            }
        }
    }
}
