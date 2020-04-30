using InWords.Data;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.DTO.Enums;
using InWords.Data.DTO.Games.Levels;
using InWords.WebApi.Model.UserWordPair;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService.Requests.AddCustomLevelHistory;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameService.Requests.SendLevelsMetric
{
    public class SaveLevelMetric : ContextRequestHandler<ClassicCardLevelMetricQuery, ClassicCardLevelMetricQueryResult, InWordsDataContext>
    {
        public SaveLevelMetric(InWordsDataContext context) : base(context)
        {

        }

        public override async Task<ClassicCardLevelMetricQueryResult> HandleRequest(ClassicCardLevelMetricQuery request, CancellationToken cancellationToken = default)
        {
            if (request is null)
                throw new ArgumentNullException(nameof(request));

            // translate UserWordPairs to WordPairs and create GameLevels
            await HandleNewHistoryGamesAsync(request, cancellationToken).ConfigureAwait(false);

            // cache metrics reference
            ImmutableArray<ClassicCardLevelMetric> metrics = request.Metrics;

            // calculate stars
            Dictionary<int, int> levelsScores = metrics.ToDictionary(m => m.GameLevelId, m => m.Score());
            // select scores
            ImmutableArray<ClassicCardLevelResult> scores = levelsScores.Select(d => new ClassicCardLevelResult(d.Key, d.Value)).ToImmutableArray();

            // TODO Handle Update score
            // TODO Existing UserGameLevel
            IEnumerable<int> nonexistent = HandleExistingUserGamesScore(request, metrics, levelsScores);
            HandleNonexistentUserGameLevels(request, nonexistent, levelsScores);
            await Context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            UpdateUserWordPairKnowledgeInfo(metrics);
            await Context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            return new ClassicCardLevelMetricQueryResult(scores);

        }

        private void HandleNonexistentUserGameLevels(
            ClassicCardLevelMetricQuery request,
            IEnumerable<int> nonexistent,
            Dictionary<int, int> levelsScores)
        {
            var nonexistentUserGameLevels = nonexistent.Select(n => new UserGameLevel()
            {
                UserId = request.UserId,
                GameLevelId = n,
                UserStars = levelsScores[n]
            });
            Context.UserGameLevels.AddRange(nonexistentUserGameLevels);
        }

        private IEnumerable<int> HandleExistingUserGamesScore(ClassicCardLevelMetricQuery request,
            ImmutableArray<ClassicCardLevelMetric> metrics,
            Dictionary<int, int> levelsScores)
        {
            var allGameIds = metrics.Select(d => d.GameLevelId).ToList();
            var currentUserContext = Context.UserGameLevels.Where(d => d.UserId.Equals(request.UserId));
            var existingUserGameLevels = currentUserContext.Where(x => allGameIds.Any(d => d.Equals(x.GameLevelId)));
            foreach (UserGameLevel level in existingUserGameLevels)
            {
                if (level.UserStars < levelsScores[level.GameLevelId])
                {
                    level.UserStars = levelsScores[level.GameLevelId];
                }
            }

            // TODO Create Nonexistent UserGameLevel
            var nonexistent = allGameIds.Except(existingUserGameLevels.Select(d => d.GameLevelId));
            return nonexistent;
        }

        private Task<CustomLevelMetricQuery> HandleNewHistoryGamesAsync(CardLevelMetricQuery request, CancellationToken cancellationToken)
        {
            var customLevel = new CustomLevelMetricQuery(request);

            return new CreateHistoryLevelsRequest(Context).Handle(customLevel, cancellationToken);
        }

        // TODO To commands
        private void UpdateUserWordPairKnowledgeInfo(ImmutableArray<ClassicCardLevelMetric> metrics)
        {
            IEnumerable<ImmutableDictionary<int, KnowledgeQualities>> userPairsQuality = metrics.Select(m => m.Qualify());
            // merge by best knowledge
            ImmutableDictionary<int, KnowledgeQualities> knowledgeQualities = userPairsQuality.SelectMany(dict => dict)
                .ToLookup(pair => pair.Key, pair => pair.Value)
                .ToDictionary(group => @group.Key, v => v.Max())
                .ToImmutableDictionary();
            // select users words
            IQueryable<UserWordPair> userWordPairs =
                Context.UserWordPairs
                    .Where(d => knowledgeQualities.Keys.Any(x => x.Equals(d.WordPairId)));
            Dictionary<UserWordPair, Memorization> dictionary = userWordPairs
                .ToDictionary(u => u, u => new Memorization()
                {
                    Period = u.LearningPeriod,
                    RepeatTime = u.TimeGap
                });

            // calculate learning period by user word information
            foreach (UserWordPair uwp in dictionary.Keys)
            {
                var knowledgeLicense =
                    MemorizationCalculator.Update(dictionary[uwp], knowledgeQualities[uwp.WordPairId]);
                uwp.LearningPeriod = knowledgeLicense.Period;
                uwp.TimeGap = knowledgeLicense.RepeatTime;
            }
        }
    }
}
