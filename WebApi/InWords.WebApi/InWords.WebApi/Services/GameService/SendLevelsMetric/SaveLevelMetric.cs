using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.DTO.Enums;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Data.DTO.Games.Levels;
using InWords.Data.Enums;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.UserWordPairService;
using InWords.WebApi.Services.UserWordPairService.Models;
using Microsoft.EntityFrameworkCore;
using KnowledgeLicenseCalculator = InWords.WebApi.Services.UserWordPairService.Models.KnowledgeLicenseCalculator;

namespace InWords.WebApi.Services.GameService.SendLevelsMetric
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

            // Handle history games=========
            // select history levels where GameLevelId is 0;
            var historyLevels = metrics.Where(g => g.GameLevelId.Equals(0)).Select(u => u.UserWordPairIdOpenCounts.Values);

            var historyLevelsList = metrics.ToList();
            if (historyLevelsList.Count > 0)
            {
                // Find history Game
                Creation historyGame = (from gameTags in Context.GameTags
                                        where gameTags.Tags.Equals(GameTags.CustomLevelsHistory)
                                        join game in Context.Creations on gameTags.GameId equals game.CreationId
                                        select game).SingleOrDefault();
                // Create if not exist
                if (historyGame is null)
                {
                    historyGame = new Creation { CreatorId = request.UserId };
                    Context.Creations.Add(historyGame);
                    await Context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
                    GameTag tag = new GameTag
                    {
                        Tags = GameTags.CustomLevelsHistory,
                        UserId = request.UserId,
                        GameId = historyGame.CreationId
                    };
                    Context.GameTags.Add(tag);
                    await Context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
                }

                // add words to game 
                var gameLevelMetric =
                    new Dictionary<GameLevel, ClassicCardLevelMetric>(historyLevelsList.Count);
                foreach (var historyLevel in historyLevelsList)
                {
                    var gameLevel = new GameLevel { GameBoxId = historyGame.CreationId };
                    gameLevelMetric.Add(gameLevel, historyLevel);
                }
                Context.GameLevels.AddRange(gameLevelMetric.Keys);
                // save games
                await Context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
                
                // save levels
                foreach (var historyLevel in gameLevelMetric.Keys)
                {
                    
                    HashSet<GameLevelWord> wordsInMetric = gameLevelMetric[historyLevel].UserWordPairIdOpenCounts.Values.Select(d => new GameLevelWord()
                    { GameLevelId = historyLevel.GameLevelId, WordPairId = d })
                        .ToHashSet();

                    historyLevel.GameLevelWords.UnionWith(wordsInMetric);
                }
                //TODO save UserLevelScore
                await Context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
                #warning continue here

                //UserGameLevel userGameLevel = new UserGameLevel(request.UserId,);
            }
            //==============

            // Handle Existing UserGameLevel
            // TODO
            // Create Nonexistent UserGameLevel
            // TODO 
        
            //// select metric when level exist
            //var userLevels = Context.UserGameLevels.Where(g => g.UserId.Equals(request.UserId));

            //// select existed level and default if empty
            //var mapExistedLevel = (from gameLevel in Context.GameLevels
            //                       join userGameLevel in userLevels on gameLevel.GameLevelId equals userGameLevel.GameLevelId into ugl
            //                       from levels in ugl.DefaultIfEmpty()
            //                       select levels).ToHashSet();


            ////IEnumerable<UserGameLevel> scoreGames = mapExistedLevel.Except(historyGames);
            ////foreach (var scoreGame in scoreGames)
            ////{
            ////    if(scoreGame.UserStars>=request.)
            ////}




            UpdateUserWordPairKnowledgeInfo(metrics);
            await Context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            return new ClassicCardLevelMetricQueryResult(scores);

        }

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
