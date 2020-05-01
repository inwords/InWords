using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;
using static InWords.Protobuf.CardGameMetrics.Types;

namespace InWords.WebApi.Swagger.Examples
{
    public class CardGameMetricsExample : IExamplesProvider<CardGameMetrics>
    {
        public CardGameMetrics GetExamples()
        {
            var example = new CardGameMetrics();
            var metric1 = new CardGameMetric { GameLevelId = 119 };
            var metric2 = new CardGameMetric { GameLevelId = 110 };
            var metric3 = new CardGameMetric { GameLevelId = 4 };

            metric1.WordIdOpenCount.Add(119, 2);
            metric1.WordIdOpenCount.Add(223, 9);
            metric2.WordIdOpenCount.Add(321, 3);
            metric2.WordIdOpenCount.Add(852, 4);
            metric2.WordIdOpenCount.Add(956, 4);
            metric2.WordIdOpenCount.Add(726, 6);
            metric3.WordIdOpenCount.Add(321, 3);
            metric3.WordIdOpenCount.Add(756, 4);
            
            example.Metrics.Add(metric1);
            example.Metrics.Add(metric2);
            example.Metrics.Add(metric3);
            return example;
        }
    }
}
