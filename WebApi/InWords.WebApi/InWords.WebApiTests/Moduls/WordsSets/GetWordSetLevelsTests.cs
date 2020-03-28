using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.Moduls.WordsSets
{
    public class GetWordSetLevelsTests
    {
        [Fact]
        public async void GetLevelsInSet()
        {
            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            var game1 = new Game();
            context.Add(game1);

            List<GameLevel> gameLevels = new List<GameLevel>
            {
                new GameLevel() { GameId = game1.GameId, },
                new GameLevel() { GameId = game1.GameId, }
            };
            context.AddRange(gameLevels);
            await context.SaveChangesAsync();
            // act
            var data = new GetLevelsRequest()
            {
                WordSetId = game1.GameId
            };
            var request = new AuthorizedRequestObject<GetLevelsRequest, GetLevelsReply>(data);
            var handler = new GetWordSetLevels(context);
            var result = await handler.Handle(request);
            // assert
            Assert.Equal(2, result.Levels.Count);
        }
    }
}
