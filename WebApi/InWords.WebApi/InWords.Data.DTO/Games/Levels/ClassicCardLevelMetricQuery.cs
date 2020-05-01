using MediatR;
using System;
using System.Collections.Immutable;

namespace InWords.Data.DTO.Games.Levels
{
    public abstract class CardLevelMetricQuery
    {
        [field: NonSerialized] public int UserId { get; set; }
        public ImmutableArray<ClassicCardLevelMetric> Metrics { get; set; }
    }

    public class ClassicCardLevelMetricQuery : CardLevelMetricQuery, IRequest<ClassicCardLevelMetricQueryResult> { }

    public class CustomLevelMetricQuery : CardLevelMetricQuery, IRequest<CustomLevelMetricQuery>
    {
        public CustomLevelMetricQuery() { }

        public CustomLevelMetricQuery(CardLevelMetricQuery metric)
        {
            UserId = metric.UserId;
            Metrics = metric.Metrics;
        }
    }

}
