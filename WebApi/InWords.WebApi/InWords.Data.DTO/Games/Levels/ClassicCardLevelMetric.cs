using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Data.DTO.Games.Levels
{
    public class ClassicCardLevelMetric
    {
        public int GameLevelId { get; set; }
        public Dictionary<int, int> UserWordPairIdOpenCounts { get; set; }
    }
}
