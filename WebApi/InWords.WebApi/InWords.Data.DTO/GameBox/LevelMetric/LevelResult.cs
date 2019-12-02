using System;

namespace InWords.Data.DTO.GameBox.LevelMetric
{
    /// <summary>
    ///     Provides level id and user metric
    /// </summary>
    [Obsolete]
    public class LevelResult
    {
        public int LevelId { get; set; }

        public int OpeningQuantity { get; set; }

        public int WordsCount { get; set; }
    }
}