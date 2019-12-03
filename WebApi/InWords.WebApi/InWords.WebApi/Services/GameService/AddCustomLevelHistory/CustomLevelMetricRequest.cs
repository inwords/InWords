using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.DTO.Games.Levels;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Extensions

namespace InWords.WebApi.Services.GameService.AddCustomLevelHistory
{
    public class CustomLevelMetricRequest : ContextRequestHandler<CustomLevelMetricQuery, CustomLevelMetricQuery, InWordsDataContext>
    {
        public CustomLevelMetricRequest(InWordsDataContext context) : base(context)
        {

        }

        public override async Task<CustomLevelMetricQuery> Handle(CustomLevelMetricQuery request, CancellationToken cancellationToken = default)
        {
            if (request == null) return new CustomLevelMetricQuery();

            // find custom levels (id equals 0)
            var metric = request.Metrics.Where(m => m.GameLevelId.Equals(0));
            var metricList = metric.ToList();

            if (metricList.Count <= 0) return new CustomLevelMetricQuery();
            // if games count more than zero
            var allUsersWordPairInRequest = metricList.Select(d => d.WordPairIdOpenCounts.Count).Distinct();
            var userWordPairsToWordPairs = Context.UserWordPairs.WereAny(allUsersWordPairInRequest)
                .ToDictionary(d => d.UserWordPairId, d => d.WordPairId);


            // load wordPairIds words from userWordPairIs 

            // find history game

            // create if not exist & save changes

            // add levels to game & save

            // add words to level

            // return filled gameIds in metric

            return base.Handle(request, cancellationToken);
        }

        
    }
}
