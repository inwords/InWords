using System.Collections.Immutable;

namespace InWords.Data.DTO.Games.Levels
{
    public class ClassicCardLevelMetricQueryResult
    {
        public ImmutableArray<ClassicCardLevelResult> ClassicCardLevelResult { get; set; }
        public ClassicCardLevelMetricQueryResult(ImmutableArray<ClassicCardLevelResult> classicCardLevelResult)
        {
            ClassicCardLevelResult = classicCardLevelResult;
        }
    }
}
