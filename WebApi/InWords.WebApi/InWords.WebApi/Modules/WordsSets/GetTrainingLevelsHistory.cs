using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
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

            var userId = request.UserId;

            var userHistoryGames = SelectUserCustomGameHistory(userId);

            var userHistoryLevels = SelectLevelsInGame(userHistoryGames);

            return SelectLevelInfos(userHistoryLevels);
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

        private async Task<GameScoreReply> SelectLevelInfos(IQueryable<GameLevel> userHistoryLevels)
        {
            GameScoreReply gameScoreReply = new GameScoreReply();

            var levels = await (from level in userHistoryLevels
                                join stars in Context.UserGameLevels.Where(d=>d.GameType == GameType.Total) 
                                on level.GameLevelId equals stars.GameLevelId into st
                                join history in Context.
                                from stars in st.DefaultIfEmpty()
                                select new ConcreteGameScore()
                                {
                                    LevelId = level.GameLevelId,
                                    IsAvailable = true,
                                    Stars = stars == null ? 0 : stars.UserStars
                                })
                         .ToArrayAsync()
                         .ConfigureAwait(false);

            gameScoreReply.Levels.Add(levels);

            return gameScoreReply;
        }
    }
}
