using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.DTO.Extensions;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.Services.GameService.SendLevelsMetric
{
    public class SaveLevelMetric : ContextRequestHandler<LevelMetricQuery, LevelMetricQueryResult, InWordsDataContext>
    {
        public SaveLevelMetric(InWordsDataContext context) : base(context)
        {

        }

        public override Task<LevelMetricQueryResult> Handle(LevelMetricQuery request, CancellationToken cancellationToken = default)
        {
            #warning continue her
            // calculate stars & update knowledge about words
            
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


            return base.Handle(request, cancellationToken);
        }
    }
}
