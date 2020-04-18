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
    public class GetLevelWordsTests
    {
        [Fact]
        public async void GetLevelWords()
        {
            // arrange
            int userId = 1;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            Game game = new Game() { };
            context.Add(game);
            await context.SaveChangesAsync();
            GameLevel gameLevel = new GameLevel()
            {
                GameId = game.GameId
            };
            context.Add(gameLevel);
            await context.SaveChangesAsync();
            List<GameLevelWord> gameLevelWords = new List<GameLevelWord>
            {
                new GameLevelWord(){ GameLevelId = gameLevel.GameLevelId, ForeignWord = "test1", NativeWord = "тест1"},
                new GameLevelWord(){ GameLevelId = gameLevel.GameLevelId, ForeignWord = "test2", NativeWord = "тест2"},
            };
            context.GameLevelWords.AddRange(gameLevelWords);
            await context.SaveChangesAsync();

            await context.AddAccount(userId);
            await context.SaveChangesAsync();

            // act
            var data = new GetLevelWordsRequest() { LevelId = gameLevel.GameLevelId };
            var request = new AuthorizedRequestObject<GetLevelWordsRequest, GetLevelWordsReply>(data)
            {
                UserId = userId
            };
            GetLevelWordsReply result = await new GetLevelWords(context).HandleRequest(request);
            // assert
            Assert.Equal(2, result.Words.Count);
        }
    }
}
