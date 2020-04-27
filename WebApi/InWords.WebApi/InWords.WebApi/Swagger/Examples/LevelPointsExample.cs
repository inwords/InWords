using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection.Metadata;

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
                SevelId = 119
            });
            levelPoints.Points.Add(new LevelPoints.Types.LevelPoint()
            {
                Score = 2,
                SevelId = 110
            });
            levelPoints.Points.Add(new LevelPoints.Types.LevelPoint()
            {
                Score = 1,
                SevelId = 4
            });
            return levelPoints;
        }
    }
}
