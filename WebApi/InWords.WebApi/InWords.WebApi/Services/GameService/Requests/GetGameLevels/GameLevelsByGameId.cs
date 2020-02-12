using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations.GameBox;
using InWords.Data.DTO.GameBox;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace InWords.WebApi.Services.GameService.Requests.GetGameLevels
{
    public class GameLevelsByGameId : ContextRequestHandler<GetLevelsByGameIdQuery, GameObject, InWordsDataContext>
    {
        public GameLevelsByGameId(InWordsDataContext context) : base(context) { }

        public override async Task<GameObject> HandleRequest(GetLevelsByGameIdQuery request, CancellationToken cancellationToken = default)
        {
            // select levels
            IQueryable<GameLevel> levelsOfGame = Context.GameLevels.Where(l => l.GameId.Equals(request.GameId));

            // join users score
            IQueryable<LevelInfo> starredLevels = from level in levelsOfGame
                                                  join userLevel in Context.UserGameLevels.Where(u => u.UserId.Equals(request.UserId)) on level.GameLevelId equals userLevel.GameLevelId into st
                                                  from userLevel in st.DefaultIfEmpty()
                                                  select new LevelInfo()
                                                  {
                                                      LevelId = level.GameLevelId,
                                                      Level = level.Level,
                                                      IsAvailable = true,
                                                      PlayerStars = userLevel.UserStars
                                                  };

            // select game object
            var gameObject = new GameObject()
            {
                GameId = request.GameId,
                Creator = "Admin",
                LevelInfos = await starredLevels.ToListAsync(cancellationToken: cancellationToken).ConfigureAwait(false)
            };
            return gameObject;
        }
    }
}
