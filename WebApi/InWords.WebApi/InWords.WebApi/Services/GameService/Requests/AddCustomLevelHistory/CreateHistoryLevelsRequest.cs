using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.DTO.Games.Levels;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.Services.GameService.Requests.AddCustomLevelHistory
{
    public class CreateHistoryLevelsRequest : ContextRequestHandler<CustomLevelMetricQuery, CustomLevelMetricQuery, InWordsDataContext>
    {
        public CreateHistoryLevelsRequest(InWordsDataContext context) : base(context)
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
            Dictionary<int, int> userWordPairsToWordPairs = Context.UserWordPairs.WhereAny(allUsersWordPairInRequest)
                .ToDictionary(d => d.UserWordPairId, d => d.WordPairId);

            // find history game
            Creation historyGame = await GetUsersCustomGameAsync(request.UserId).ConfigureAwait(false);

            // add levels to game & save
            List<GameLevel> levels = await CreateLevelsAsync(historyGame.CreationId, historyLevelsCount).ConfigureAwait(false);

            // add words to level & update metric
            await AddWordsToLevel(levels, metricList, userWordPairsToWordPairs).ConfigureAwait(false);

            return request;
        }

        private Task<Creation> GetUsersCustomGameAsync(int userId)
        {
            return new GetHistoryGame(Context).HandleAsync(userId);
        }


        private Task AddWordsToLevel(List<GameLevel> levels,
            List<ClassicCardLevelMetric> metrics,
            Dictionary<int, int> userWordPairsToWordPairs)
        {

            if (levels.Count != metrics.Count)
                throw new ArgumentOutOfRangeException($"Number of {nameof(levels)} and {nameof(metrics)} mismatch");

            for (var i = 0; i < levels.Count; i++)
            {
                // Update metric
                metrics[i].GameLevelId = levels[i].GameLevelId;

                // translate words
                List<int> translated = Translate(metrics, userWordPairsToWordPairs, i);

                // Add Add level words
                IEnumerable<GameLevelWord> gameLevelWords = translated.Select(t => new GameLevelWord()
                {
                    GameLevelId = levels[i].GameLevelId,
                    WordPairId = t
                });

                Context.GameLevelWords.AddRange(gameLevelWords);
            }
            return Context.SaveChangesAsync();
        }

        private static List<int> Translate(List<ClassicCardLevelMetric> metrics,
            Dictionary<int, int> userWordPairsToWordPairs,
            int i)
        {
            IEnumerable<int> currentUserWordPairIds = metrics[i].WordPairIdOpenCounts.Select(d => d.Key);
            List<int> userWordPairIds = currentUserWordPairIds.ToList();
            var translated = new List<int>(userWordPairIds.Count);
            translated.AddRange(userWordPairIds.Select(value => userWordPairsToWordPairs[value]));
            return translated;
        }

        private async Task<List<GameLevel>> CreateLevelsAsync(int historyGame, int count)
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
