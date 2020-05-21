using InWords.Data;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetWordSetLevels
        : AuthorizedRequestObjectHandler<GetLevelsRequest, GetLevelsReply, InWordsDataContext>
    {
        public GetWordSetLevels(InWordsDataContext context) : base(context)
        {

        }

        public override Task<GetLevelsReply> HandleRequest(
            AuthorizedRequestObject<GetLevelsRequest, GetLevelsReply> request,
            CancellationToken cancellationToken = default)
        {
            var requestData = request.Value;
            int userId = request.UserId;
            GetLevelsReply getLevelsReply = new GetLevelsReply();
            // select levels
            var levelsOfGame = Context.GameLevels.Where(l => l.GameId.Equals(requestData.WordSetId));

            // join users score
            var starredLevels = from level in levelsOfGame
                                join userLevel in Context.UserGameLevels.Where(u => u.UserId.Equals(request.UserId) 
                                && u.GameType == GameType.Total)
                                on level.GameLevelId equals userLevel.GameLevelId into st
                                from userLevel in st.DefaultIfEmpty()
                                select new LevelReply()
                                {
                                    LevelId = level.GameLevelId,
                                    Level = level.Level,
                                    IsAvailable = true,
                                    Stars = userLevel == null ? 0 : (int)Math.Round(userLevel.UserStars / 2.0),
                                    Score = userLevel == null? 0 : userLevel.UserStars
                                };

            getLevelsReply.Levels.AddRange(starredLevels);
            return Task.Run(() => { return getLevelsReply; });
        }
    }
}
