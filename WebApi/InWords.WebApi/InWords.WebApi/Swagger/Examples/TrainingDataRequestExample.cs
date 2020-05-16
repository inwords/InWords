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
                AuditionMetric = new AuditionMetric(),
                CardsMetric = new CardsMetric()
            };
            Dictionary<int, int> keyValuePairs = new Dictionary<int, int>
            {
                {1,2},
                {3,4}
            };

            metric1.AuditionMetric.WordIdOpenCount.Add(keyValuePairs);
            metric1.CardsMetric.WordIdOpenCount.Add(keyValuePairs);
            trainingDataRequest.Metrics.Add(metric1);

            return trainingDataRequest;
        }
    }
}
