using System;
using System.Collections.Immutable;

namespace InWords.Data.DTO.Games.Levels
{
    public class ClassicCardLevelMetricQuery
    {
        [field: NonSerialized] public int UserId { get; set; }
        public ImmutableArray<ClassicCardLevelMetric> Metrics { get; set; }
    }
}
