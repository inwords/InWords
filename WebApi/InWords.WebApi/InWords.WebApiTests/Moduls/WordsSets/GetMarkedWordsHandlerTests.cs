using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace InWords.WebApiTests.Moduls.WordsSets
{
    public class GetMarkedWordsHandlerTests
    {
        private static async Task CreateTestContext(InWordsDataContext context)
        {
            await context.AddAccount(1);

            context.Languages.AddLanguages();


            HashSet<GameLevelWord> gameLevelWords = new HashSet<GameLevelWord>
            {
                new GameLevelWord() { NativeWord = "тест4", ForeignWord = "test4" },
                new GameLevelWord() { NativeWord = "тест5", ForeignWord ="test5"}
            };

            HashSet<GameLevel> gameLevels = new HashSet<GameLevel>
            {
                new GameLevel()
                {
                    GameLevelWords = gameLevelWords,
                }
            };
            Game game = new Game()
            {
                CreatorId = 0,
                GameLevels = gameLevels
            };

            context.Games.Add(game);
            await context.SaveChangesAsync();
        }
        [Fact]
        public async Task GetWordsAsync()
        {

            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await CreateTestContext(context);
            WordSetWordsRequest requestData = new WordSetWordsRequest()
            {
                WordSetId = context.Games.First().GameId
            };
            var request = new AuthReq<WordSetWordsRequest, WordSetWordsReply>(requestData)
            {
                UserId = context.Users.First().UserId
            };

            // act
            var reply = await new GetMarkedWordsHandler(context).Handle(request);

            // assert
            Assert.Equal(2, reply.Words.Count);

        }

        [Fact]
        public async Task GetWordsAsyncUserHasOne()
        {

            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await CreateTestContext(context);
            WordSetWordsRequest requestData = new WordSetWordsRequest()
            {
                WordSetId = context.Games.First().GameId
            };
            var request = new AuthReq<WordSetWordsRequest, WordSetWordsReply>(requestData)
            {
                UserId = context.Users.First().UserId
            };
            context.UserWordPairs.Add(new UserWordPair()
            {
                UserId = context.Users.First().UserId,
                ForeignWord = "test4",
                NativeWord = "тест4"
            });
            context.SaveChanges();
            // act
            var reply = await new GetMarkedWordsHandler(context).Handle(request);

            // assert
            Assert.Single(reply.Words.Where(d => d.HasAdded.Equals(true)));
            Assert.Single(reply.Words.Where(d => d.HasAdded.Equals(false)));
        }
    }
}
