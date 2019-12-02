using System;
using System.Collections.Immutable;
using MediatR;

namespace InWords.Data.DTO.Games.Levels
{
    public class ClassicCardLevelMetricQuery : IRequest<ClassicCardLevelMetricQueryResult>
    {
        [field: NonSerialized] public int UserId { get; set; }
        public ImmutableArray<ClassicCardLevelMetric> Metrics { get; set; }
    }
}
