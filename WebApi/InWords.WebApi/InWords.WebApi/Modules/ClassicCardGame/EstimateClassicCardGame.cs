using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Creations.GameBox;
using InWords.Protobuf;
using InWords.WebApi.Extensions.InWordsDataContextExtentions;
using InWords.WebApi.Model.UserWordPair;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using InWords.WebApi.Modules.ClassicCardGame.Service;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.ClassicCardGame
{
    public class EstimateClassicCardGame
        : AuthorizedRequestObjectHandler<CardGameMetrics, LevelPoints, InWordsDataContext>
    {
        public EstimateClassicCardGame(InWordsDataContext context) : base(context)
        {

        }

        public override async Task<LevelPoints> HandleRequest(
            AuthorizedRequestObject<CardGameMetrics, LevelPoints> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException($"{nameof(request)}");

            var userId = request.UserId;
            var value = request.Value;

            foreach (var metric in value.Metrics)
            {
                // for safety objective
                var userWords = Context.UserWordPairs.Where(u => u.UserId == userId);

                // find words knowlenge info in user's words pairs
                int[] metricsWordIds = metric.WordIdOpenCount.Keys.ToArray();
                var existedWords = userWords.Where(d => metricsWordIds.Contains(d.UserWordPairId)).ToArray();
                // calculate memorization
                IKnowledgeQualifier knowledgeQualifier = new CardGameQualifier(metric.WordIdOpenCount.ToDictionary(t => t.Key, t => t.Value));
                var license = knowledgeQualifier.Qualify();
                // update memorization
                existedWords.UpdateMemorisation(license);
                await Context.SaveChangesAsync().ConfigureAwait(false);
            }

            return await CalculatePoints(userId, value).ConfigureAwait(false);
        }

        private async Task<LevelPoints> CalculatePoints(int userId, CardGameMetrics value)
        {
            var scoreInfo = value.LevelStars();
            var levelIds = scoreInfo.Keys.ToArray();
            var existedLevels = Context.UserGameLevels
                .Where(u=>u.UserId == userId)
                .Where(u => levelIds.Contains(u.GameLevelId));
            var levelsToAdd = levelIds.Except(existedLevels.Select(d => d.GameLevelId));

            LevelPoints levelPoints = new LevelPoints();

            levelsToAdd.ForEach((levelToAdd) =>
            {
                Context.UserGameLevels.Add(new UserGameLevel()
                {
                    GameLevelId = levelToAdd,
                    UserId = userId,
                    UserStars = scoreInfo[levelToAdd]
                });
                levelPoints.Points.Add(new LevelPoints.Types.LevelPoint()
                {
                    Score = scoreInfo[levelToAdd],
                    LevelId = levelToAdd
                });
            });

            existedLevels.ForEach((level) =>
            {
                if(level.UserStars < scoreInfo[level.GameLevelId])
                    level.UserStars = scoreInfo[level.GameLevelId];
                
                levelPoints.Points.Add(new LevelPoints.Types.LevelPoint()
                {
                    Score = level.UserStars,
                    LevelId = level.GameLevelId
                });
            });
            await Context.SaveChangesAsync().ConfigureAwait(false);

            return levelPoints;
        }
    }
}
