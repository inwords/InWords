using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.DTO.Enums;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Data.DTO.Games.Levels;
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.Services.GameService.SendLevelsMetric
{
    public class SaveLevelMetric : ContextRequestHandler<ClassicCardLevelMetricQuery, ClassicCardLevelMetricQueryResult, InWordsDataContext>
    {
        public SaveLevelMetric(InWordsDataContext context) : base(context)
        {

        }

        public override Task<ClassicCardLevelMetricQueryResult> Handle(ClassicCardLevelMetricQuery request, CancellationToken cancellationToken = default)
        {
            if (request is null)
                throw new ArgumentNullException(nameof(request));

            // cache metrics reference
            var metrics = request.Metrics;

            // calculate stars & update knowledge about words

            // metric to score
            var levelsScores = metrics
                .ToDictionary(m => m.GameLevelId, m => m.Score())
                .ToImmutableDictionary();



            // select metric when level exist
            var userLevels = Context.UserGameLevels.Where(g => g.UserId.Equals(request.UserId));

            // select existed level and default if empty
            var mapExistedLevel = (from gameLevel in Context.GameLevels
                                   join userGameLevel in userLevels on gameLevel.GameLevelId equals userGameLevel.GameLevelId into ugl
                                   from levels in ugl.DefaultIfEmpty()
                                   select levels).ToHashSet();

            // add to history when not exist
            var historyGames = mapExistedLevel.Where(g => g.GameLevelId.Equals(0));

            // add game if game not exist
            var scoreGames = mapExistedLevel.Except(historyGames);
            //foreach (var scoreGame in scoreGames)
            //{
            //    if(scoreGame.UserStars>=request.)
            //}

            // update user words
            // metric to knowledge
            var userPairsQuality = metrics.Select(m => m.Qualify());

            ImmutableDictionary<int, KnowledgeQualities> knowledgeQualities = userPairsQuality.SelectMany(dict => dict)
                .ToLookup(pair => pair.Key, pair => pair.Value)
                .ToDictionary(group => group.Key, v => v.Max())
                .ToImmutableDictionary();

            IQueryable<UserWordPair> userWordPairs = Context.UserWordPairs.Where(d => knowledgeQualities.Keys.Any(x => x.Equals(d.UserWordPairId)));


            return base.Handle(request, cancellationToken);
        }
    }
}
