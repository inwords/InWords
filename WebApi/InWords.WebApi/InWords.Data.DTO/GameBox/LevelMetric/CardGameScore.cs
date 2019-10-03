using System.Collections.Generic;

namespace InWords.Data.DTO.GameBox.LevelMetric
{
    public class CardGameScore
    {
        public int GameLevelId { get; set; }
        public Dictionary<int, int> WordPairIdOpenCounts { get; set; }
    }
}