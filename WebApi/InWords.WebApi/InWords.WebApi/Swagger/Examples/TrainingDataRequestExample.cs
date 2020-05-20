using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;
using System.Collections.Generic;
using static InWords.Protobuf.TrainingDataRequest.Types.Training.Types;

namespace InWords.WebApi.Swagger.Examples
{
    public class TrainingDataRequestExample : IExamplesProvider<TrainingDataRequest>
    {
        public TrainingDataRequest GetExamples()
        {
            TrainingDataRequest trainingDataRequest = new TrainingDataRequest();

            var metric1 = new TrainingDataRequest.Types.Training
            {
                GameLevelId = 123,
                ClosedAudioCardsMetric = new ClosedAudioCardsMetric(),
                ClosedAudioCards2Metric = new ClosedAudioCardsTwoMetric(),
                ClosedCardsMetric = new ClosedCardsMetric(),
                
                OpenedAudioCardsMetric = new OpenedAudioCardsMetric(),
                OpenedAudioCards2Metric = new OpenedAudioCardsTwoMetric(),
                OpenedCardsMetric = new OpenedCardsMetric(),
            };
            Dictionary<int, int> keyValuePairs = new Dictionary<int, int>
            {
                {1,2},
                {3,4}
            };

            metric1.ClosedCardsMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.ClosedAudioCards2Metric.WordIdOpenCount.Add(keyValuePairs);
            metric1.ClosedAudioCardsMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.OpenedCardsMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.OpenedAudioCards2Metric.WordIdOpenCount.Add(keyValuePairs);
            metric1.OpenedAudioCardsMetric.WordIdOpenCount.Add(keyValuePairs);
            trainingDataRequest.Metrics.Add(metric1);

            return trainingDataRequest;
        }
    }
}
