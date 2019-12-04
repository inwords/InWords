using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.DTO.GameBox;
using InWords.Data.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InWords.WebApi.Services.UserGameService.GetUsersGameHistory
{
    public class GetUserGameStoryHandler : IRequestHandler<GetUserGameStoryQuery, List<LevelInfo>>
    {
        private readonly InWordsDataContext context;

        public GetUserGameStoryHandler(InWordsDataContext context)
        {
            this.context = context;
        }

        public Task<List<LevelInfo>> Handle(GetUserGameStoryQuery request, CancellationToken cancellationToken = default)
        {
            IQueryable<Creation> userHistoryGames = SelectUserCustomGameHistory(request);

            IQueryable<GameLevel> userHistoryLevels = SelectLevelsInGame(userHistoryGames);

            IQueryable<LevelInfo> levelInfos = SelectLevelInfos(userHistoryLevels);

            return levelInfos.ToListAsync(cancellationToken: cancellationToken);
        }

        private IQueryable<LevelInfo> SelectLevelInfos(IQueryable<GameLevel> userHistoryLevels)
        {
            return from level in userHistoryLevels
                   join stars in context.UserGameLevels on level.GameLevelId equals stars.GameLevelId into st
                   from stars in st.DefaultIfEmpty()
                   select new LevelInfo()
                   {
                       LevelId = level.GameLevelId,
                       Level = level.Level,
                       IsAvailable = true,
                       PlayerStars = stars.UserStars
                   };
        }

        private IQueryable<GameLevel> SelectLevelsInGame(IQueryable<Creation> allUsersGames)
        {
            return context.GameLevels.Where(g => allUsersGames.Any(a => a.CreationId.Equals(g.GameBoxId)));
        }

        private IQueryable<Creation> SelectUserCustomGameHistory(GetUserGameStoryQuery request)
        {
            return from tags in context.GameTags
                   where tags.UserId.Equals(request.UserId)
                         && tags.Tags.Equals(GameTags.CustomLevelsHistory)
                   join creation in context.Creations on tags.GameId equals creation.CreationId
                   select creation;
        }
    }
}
