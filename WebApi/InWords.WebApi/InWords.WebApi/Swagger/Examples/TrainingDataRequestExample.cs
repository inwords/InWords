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
                ClosedAudioCardsTwoMetric = new ClosedAudioCardsTwoMetric(),
                ClosedCardsMetric = new ClosedCardsMetric(),
                
                OpenedAudioCardsMetric = new OpenedAudioCardsMetric(),
                OpenedAudioCardsTwoMetric = new OpenedAudioCardsTwoMetric(),
                OpenedCardGameMetric = new OpenedCardGameMetric(),
            };
            Dictionary<int, int> keyValuePairs = new Dictionary<int, int>
            {
                {1,2},
                {3,4}
            };

            metric1.ClosedCardsMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.ClosedAudioCardsTwoMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.ClosedAudioCardsMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.OpenedCardGameMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.OpenedAudioCardsTwoMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.OpenedAudioCardsMetric.WordIdOpenCount.Add(keyValuePairs);
            trainingDataRequest.Metrics.Add(metric1);

            return trainingDataRequest;
        }
    }
}
