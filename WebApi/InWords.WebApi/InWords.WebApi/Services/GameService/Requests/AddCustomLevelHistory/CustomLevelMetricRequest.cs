using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.DTO.Games.Levels;
using InWords.Data.Enums;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.GameService.Requests;

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
            int historyLevelsCount = metricList.Count;
            if (historyLevelsCount <= 0) return new CustomLevelMetricQuery();
            // if games count more than zero
            var allUsersWordPairInRequest = metricList.Select(d => d.WordPairIdOpenCounts.Count).Distinct();
            // load wordPairIds words from userWordPairIs 
            var userWordPairsToWordPairs = Context.UserWordPairs.WhereAny(allUsersWordPairInRequest)
                .ToDictionary(d => d.UserWordPairId, d => d.WordPairId);

            // find history game
            Creation historyGame = await GetUsersCustomGameAsync(request.UserId).ConfigureAwait(false);

            // add levels to game & save
            List<GameLevel> levels = await CreateLevels(historyGame.CreationId, historyLevelsCount).ConfigureAwait(false);
            
            // add words to level


            // return filled gameIds in metric

            throw new NotImplementedException();
            //base.Handle(request, cancellationToken);
        }

        private Task<Creation> GetUsersCustomGameAsync(int userId)
        {
            return new GetHistoryGame(Context).HandleAsync(userId);
        }

        private async Task<List<GameLevel>> CreateLevels(int historyGame, int count)
        {
            IEnumerable<GameLevel> gameLevels = Enumerable.Range(0, count)
                .Select(historyLevel => new GameLevel { GameBoxId = historyGame });
            List<GameLevel> gameLevelsList = gameLevels.ToList();
            Context.GameLevels.AddRange(gameLevelsList);
            await Context.SaveChangesAsync().ConfigureAwait(false);
            return gameLevelsList;
        }


    }
}
