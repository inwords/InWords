using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.DTO.Enums;
using InWords.Data.DTO.Games.Levels;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService.Requests.AddCustomLevelHistory;
using InWords.WebApi.Services.UserWordPairService.Models;
using Microsoft.EntityFrameworkCore;
using KnowledgeLicenseCalculator = InWords.WebApi.Services.UserWordPairService.Models.KnowledgeLicenseCalculator;

namespace InWords.WebApi.Services.GameService.Requests.SendLevelsMetric
{
    public class SaveLevelMetric : ContextRequestHandler<ClassicCardLevelMetricQuery, ClassicCardLevelMetricQueryResult, InWordsDataContext>
    {
        public SaveLevelMetric(InWordsDataContext context) : base(context)
        {

        }

        public override async Task<ClassicCardLevelMetricQueryResult> Handle(ClassicCardLevelMetricQuery request, CancellationToken cancellationToken = default)
        {
            if (request is null)
                throw new ArgumentNullException(nameof(request));

            // cache metrics reference
            ImmutableArray<ClassicCardLevelMetric> metrics = request.Metrics;

            // calculate stars
            Dictionary<int, int> levelsScores = metrics.ToDictionary(m => m.GameLevelId, m => m.Score());
            ImmutableArray<ClassicCardLevelResult> scores = levelsScores.Select(d => new ClassicCardLevelResult(d.Key, d.Value)).ToImmutableArray();

            await HandleNewHistoryGamesAsync(request, cancellationToken).ConfigureAwait(false);

            // TODO Handle Existing UserGameLevel
            // TODO Create Nonexistent UserGameLevel
            // TODO Update Scores
            UpdateUserWordPairKnowledgeInfo(metrics);
            await Context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            return new ClassicCardLevelMetricQueryResult(scores);

        }

        private Task<CustomLevelMetricQuery> HandleNewHistoryGamesAsync(CardLevelMetricQuery request, CancellationToken cancellationToken)
        {
            var customLevel = new CustomLevelMetricQuery(request);

            return new CustomLevelMetricRequest(Context).Handle(customLevel, cancellationToken);
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
                Context.UserWordPairs.Where(d => knowledgeQualities.Keys.Any(x => x.Equals(d.UserWordPairId)));
            Dictionary<UserWordPair, KnowledgeLicense> dictionary = userWordPairs
                .AsNoTracking()
                .ToDictionary(u => u, u => new KnowledgeLicense()
                {
                    Period = u.LearningPeriod,
                    RepeatTime = u.TimeGap
                });

            // calculate learning period by user word information
            foreach (UserWordPair uwp in dictionary.Keys)
            {
                var knowledgeLicense =
                    KnowledgeLicenseCalculator.Update(dictionary[uwp], knowledgeQualities[uwp.UserWordPairId]);
                uwp.LearningPeriod = knowledgeLicense.Period;
                uwp.TimeGap = knowledgeLicense.RepeatTime;
            }

            Context.UserWordPairs.UpdateRange(dictionary.Keys);
        }
    }
}
