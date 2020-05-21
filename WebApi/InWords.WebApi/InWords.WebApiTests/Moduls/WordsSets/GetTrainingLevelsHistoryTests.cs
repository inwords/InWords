using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
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
            var userId = 2;

            using InWordsDataContext context = InWordsDataContextFactory.Create();

            var creation2 = new Game { CreatorId = userId + 1 }; // != user 
            var creation1 = new Game { CreatorId = userId, GameId = 2 };

            context.Games.Add(creation1);
            context.Games.Add(creation2);
            context.GameTags.Add(new GameTag() { Tags = GameTags.CustomLevelsHistory, GameId = 2, UserId = userId });
            creation1.GameLevels.Add(new GameLevel() { Game = creation1 });
            creation1.GameLevels.Add(new GameLevel() { Game = creation1 });
            creation2.GameLevels.Add(new GameLevel() { Game = creation2 });
            creation2.GameLevels.Add(new GameLevel() { Game = creation2 });
            context.SaveChanges();

            // action
            var words = new GetTrainingLevelsHistory(context);
            var test = await words.Handle((new AuthorizedRequestObject<Empty, GameScoreReply>(new Empty()) { UserId = userId }))
                .ConfigureAwait(false);

            // assert
            Assert.Equal(2, test.Levels.Count);
        }
    }
}
