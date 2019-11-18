using System.Linq;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.WebApi.Services.GameWordsToDictionary.WordsIdsByGameId;
using InWords.WebApi.Services.UserGameService.GetUsersGameHistory;
using InWords.WebApiTests.Controllers.v1._0;
using Xunit;

namespace InWords.WebApiTests.Services.UserGameService.GetUsersGameHistory
{
    public class GetUserGameStoryHandlerTests
    {
        [Fact]
        public async void HandleWords()
        {
            // prepare
            var userId = 2;

            await using InWordsDataContext context = InWordsDataContextFactory.Create();

            var creation2 = new Creation { CreatorId = userId + 1 }; // != user 
            var creation1 = new Creation { CreatorId = userId };
            context.Creations.Add(creation1);
            context.Creations.Add(creation2);
            creation1.GameLevels.Add(new GameLevel() { GameBox = creation1 });
            creation1.GameLevels.Add(new GameLevel() { GameBox = creation1 });
            creation2.GameLevels.Add(new GameLevel() { GameBox = creation2 });
            creation2.GameLevels.Add(new GameLevel() { GameBox = creation2 });
            context.SaveChanges();

            // action
            var words = new GetUserGameStoryHandler(context);
            var test = await words.Handle(new GetUserGameStoryQuery() { UserId = userId })
                    .ConfigureAwait(false);

            // assert
            Assert.Equal(2, test.Count);
        }
    }
}
