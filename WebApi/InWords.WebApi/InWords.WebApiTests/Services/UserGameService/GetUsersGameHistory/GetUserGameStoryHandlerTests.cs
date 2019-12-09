using System.Linq;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
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
            var words = new GetUserGameStoryHandler(context);
            var test = await words.Handle(new GetUserGameStoryQuery() { UserId = userId })
                    .ConfigureAwait(false);

            // assert
            Assert.Equal(2, test.Count);
        }
    }
}
