using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.Services.GameService.SendLevelsMetric
{
    public class LevelMetric : ContextRequestHandler<LevelMetricQuery,LevelMetricQueryResult,InWordsDataContext>
    {
        public LevelMetric(InWordsDataContext context) : base(context)
        {

        }

        public override Task<LevelMetricQueryResult> Handle(LevelMetricQuery request, CancellationToken cancellationToken = default)
        {
            return base.Handle(request, cancellationToken);
        }
    }
}
