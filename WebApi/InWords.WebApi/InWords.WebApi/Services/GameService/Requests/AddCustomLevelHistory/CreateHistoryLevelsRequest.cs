using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.DTO.Games.Levels;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameService.Requests.AddCustomLevelHistory
{
    public class CreateHistoryLevelsRequest : ContextRequestHandler<CustomLevelMetricQuery, CustomLevelMetricQuery, InWordsDataContext>
    {
        public CreateHistoryLevelsRequest(InWordsDataContext context) : base(context)
        {

        }

        public override async Task<CustomLevelMetricQuery> HandleRequest(CustomLevelMetricQuery request, CancellationToken cancellationToken = default)
        {
            if (request == null) return new CustomLevelMetricQuery();

            // find custom levels (id equals 0)
            var metric = request.Metrics.Where(m => m.GameLevelId.Equals(0));
            var metricList = metric.ToList();
            int historyLevelsCount = metricList.Count;
            if (historyLevelsCount <= 0) return new CustomLevelMetricQuery();
            // if games count more than zero
            var allUsersWordPairInRequest = metricList.SelectMany(d => d.WordPairIdOpenCounts.Keys)
                .Distinct()
                .ToList();

            // load wordPairIds words from userWordPairIs 
            Dictionary<int, int> userWordPairsToWordPairs = Context.UserWordPairs.WhereAny(allUsersWordPairInRequest)
                .ToDictionary(d => d.UserWordPairId, d => d.WordPairId);


            CheckWordsExistens(allUsersWordPairInRequest, userWordPairsToWordPairs);

            // find history game
            Game historyGame = await GetUsersCustomGameAsync(request.UserId).ConfigureAwait(false);

            // add levels to game & save
            List<GameLevel> levels = await CreateLevelsAsync(historyGame.GameId, historyLevelsCount).ConfigureAwait(false);

            // add words to level & update metric
            await AddWordsToLevel(levels, metricList, userWordPairsToWordPairs).ConfigureAwait(false);

            return request;
        }

        private static void CheckWordsExistens(List<int> allUsersWordPairInRequest, Dictionary<int, int> userWordPairsToWordPairs)
        {
            IEnumerable<int> except = allUsersWordPairInRequest.Except(userWordPairsToWordPairs.Select(d => d.Key));
            if (except.Any())
            {
                throw new ArgumentOutOfRangeException(
                    $"{nameof(allUsersWordPairInRequest)} metrics contains user words that were not found in the database");
            }
        }

        private Task<Game> GetUsersCustomGameAsync(int userId)
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
                Translate(metrics[i], userWordPairsToWordPairs);

                // Add Add level words
                IEnumerable<GameLevelWord> gameLevelWords = metrics[i]
                    .WordPairIdOpenCounts
                    .Select(t => new GameLevelWord()
                    {
                        GameLevelId = levels[i].GameLevelId,
                        WordPairId = t.Key
                    });

                Context.GameLevelWords.AddRange(gameLevelWords);
            }
            return Context.SaveChangesAsync();
        }

        private static void Translate(ClassicCardLevelMetric metric,
            Dictionary<int, int> userWordPairsToWordPairs)
        {

            var translatedDictionary = new Dictionary<int, int>();

            foreach (var wordPair in metric.WordPairIdOpenCounts)
            {
                var translatedKey = userWordPairsToWordPairs[wordPair.Key];
                translatedDictionary.Add(translatedKey, wordPair.Value);
            }

            metric.WordPairIdOpenCounts = translatedDictionary;

            IEnumerable<int> levelWordPairsId = metric.WordPairIdOpenCounts.Select(d => d.Key);
        }

        private async Task<List<GameLevel>> CreateLevelsAsync(int historyGame, int count)
        {
            IEnumerable<GameLevel> gameLevels = Enumerable.Range(0, count)
                .Select(historyLevel => new GameLevel { GameId = historyGame });

            List<GameLevel> gameLevelsList = gameLevels.ToList();

            Context.GameLevels.AddRange(gameLevelsList);

            await Context.SaveChangesAsync().ConfigureAwait(false);

            return gameLevelsList;
        }


    }
}
