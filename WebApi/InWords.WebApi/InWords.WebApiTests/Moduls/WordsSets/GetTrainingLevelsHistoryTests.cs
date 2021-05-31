using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace InWords.WebApiTests.Moduls.WordsSets
{
    public class GetTrainingLevelsHistoryTests
    {
        [Fact]
        public async Task Get_History_Levels()
        {
            // prepare
            var userId = 1;

            using InWordsDataContext context = InWordsDataContextFactory.Create();

            var creation1 = new Game { CreatorId = userId, GameId = 1 };
            var creation2 = new Game { CreatorId = userId + 2, GameId = 2 }; // != user 

            context.Games.Add(creation1);
            context.Games.Add(creation2);
            context.GameTags.Add(new GameTag() { Tags = GameTags.CustomLevelsHistory, GameId = 1, UserId = userId });
            creation1.GameLevels.Add(new GameLevel() { Game = creation1, });
            creation1.GameLevels.Add(new GameLevel() { Game = creation1 });
            creation2.GameLevels.Add(new GameLevel() { Game = creation2 });
            creation2.GameLevels.Add(new GameLevel() { Game = creation2 });
            context.SaveChanges();

            // action
            var words = new GetTrainingLevelsHistory(context);
            var test = await words.Handle((new AuthReq<Empty, GameScoreReply>(new Empty()) { UserId = userId }))
                .ConfigureAwait(false);

            // assert
            Assert.Equal(2, test.Levels.Count);
        }

        [Fact]
        public async Task HistoryLevelsMultyTypes_GetOnce()
        {
            // prepare
            var userId = 1;

            using InWordsDataContext context = InWordsDataContextFactory.Create();
            int gameId = 1;
            var creation1 = new Game { CreatorId = userId, GameId = gameId };
            context.Games.Add(creation1);
            context.GameTags.Add(new GameTag() { Tags = GameTags.CustomLevelsHistory, GameId = gameId, UserId = userId });
            creation1.GameLevels.Add(new GameLevel() { Game = creation1 });
            context.SaveChanges();
            int gameLevelId = creation1.GameLevels.First().GameLevelId;
            context.UserGameLevels.Add(new UserGameLevel(userId, gameLevelId, 6, GameType.Audio));
            context.UserGameLevels.Add(new UserGameLevel(userId, gameLevelId, 6, GameType.ClosedAudioCards));
            context.UserGameLevels.Add(new UserGameLevel(userId, gameLevelId, 6, GameType.Total));

            context.SaveChanges();

            // action
            var words = new GetTrainingLevelsHistory(context);
            var test = await words.Handle((new AuthReq<Empty, GameScoreReply>(new Empty()) { UserId = userId }))
                .ConfigureAwait(false);

            // assert
            Assert.Single(test.Levels);
        }
    }
}
