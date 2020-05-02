using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class LevelPointsExample : IExamplesProvider<LevelPoints>
    {
        public LevelPoints GetExamples()
        {
            LevelPoints levelPoints = new LevelPoints();
            levelPoints.Points.Add(new LevelPoints.Types.LevelPoint()
            {
                Score = 3,
                LevelId = 119
            });
            levelPoints.Points.Add(new LevelPoints.Types.LevelPoint()
            {
                Score = 2,
                LevelId = 110
            });
            levelPoints.Points.Add(new LevelPoints.Types.LevelPoint()
            {
                Score = 1,
                LevelId = 4
            });
            return levelPoints;
        }
    }
}
