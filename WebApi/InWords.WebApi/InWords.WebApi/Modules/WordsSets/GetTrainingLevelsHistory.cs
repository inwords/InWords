using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static InWords.Protobuf.GameScoreReply.Types;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetTrainingLevelsHistory
        : AuthorizedRequestObjectHandler<Empty, GameScoreReply, InWordsDataContext>
    {
        public GetTrainingLevelsHistory(InWordsDataContext context) : base(context) { }

        public override Task<GameScoreReply> HandleRequest(AuthorizedRequestObject<Empty, GameScoreReply> request,
            CancellationToken cancellationToken = default)
        {

            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var value = request.Value;
            var userId = request.UserId;

            var userHistoryGames = SelectUserCustomGameHistory(userId);

            var userHistoryLevels = SelectLevelsInGame(userHistoryGames);

            var levelInfos = SelectLevelInfos(userHistoryLevels);

            return Task.Run(() => levelInfos);
        }

        private IQueryable<Game> SelectUserCustomGameHistory(int userId)
        {
            return from tags in Context.GameTags
                   where tags.UserId.Equals(userId)
                         && tags.Tags.Equals(GameTags.CustomLevelsHistory)
                   join creation in Context.Games on tags.GameId equals creation.GameId
                   select creation;
        }

        private IQueryable<GameLevel> SelectLevelsInGame(IQueryable<Game> userHistoryGames)
        {
            return Context.GameLevels.Where(g => userHistoryGames.Any(a => a.GameId.Equals(g.GameId)));
        }

        private GameScoreReply SelectLevelInfos(IQueryable<GameLevel> userHistoryLevels)
        {
            GameScoreReply gameScoreReply = new GameScoreReply();

            var levels = from level in userHistoryLevels
                         join stars in Context.UserGameLevels on level.GameLevelId equals stars.GameLevelId into st
                         from stars in st.DefaultIfEmpty()
                         select new ConcreteGameScore()
                         {
                             LevelId = level.GameLevelId,
                             IsAvailable = true,
                             Stars = stars.UserStars,
                             GameType = (int)stars.GameType
                         };

            gameScoreReply.Levels.Add(levels);

            return gameScoreReply;
        }
    }
}
