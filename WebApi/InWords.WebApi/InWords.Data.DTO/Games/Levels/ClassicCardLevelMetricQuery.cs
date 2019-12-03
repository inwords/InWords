using System;
using System.Collections.Immutable;
using MediatR;

namespace InWords.Data.DTO.Games.Levels
{
    public abstract class CardLevelMetricQuery
    {
        [field: NonSerialized] public int UserId { get; set; }
        public ImmutableArray<ClassicCardLevelMetric> Metrics { get; set; }
    }

    public class ClassicCardLevelMetricQuery : CardLevelMetricQuery, IRequest<ClassicCardLevelMetricQueryResult> { }
    public class CustomLevelMetricQuery : CardLevelMetricQuery, IRequest<CustomLevelMetricQuery> { }
}
