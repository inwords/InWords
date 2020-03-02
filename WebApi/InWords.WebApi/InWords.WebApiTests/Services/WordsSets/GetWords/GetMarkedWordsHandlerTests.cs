using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.WordsSets.GetWords;
using InWords.WebApiTests.Controllers.v1._0;
using InWords.WebApiTests.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace InWords.WebApiTests.Services.WordsSets.GetWords
{
    public class GetMarkedWordsHandlerTests
    {
        private static async Task CreateTestContext(InWordsDataContext context)
        {
            await context.AddAccount(1);

            context.Languages.AddLanguages();

            int word1 = context.AddWordPair("test", "Тест");
            int word2 = context.AddWordPair("tes2", "Тест2");
            int word3 = context.AddWordPair("test3", "Тест3");

            HashSet<GameLevelWord> gameLevelWords = new HashSet<GameLevelWord>
            {
                new GameLevelWord() { WordPairId = word1 },
                new GameLevelWord() { WordPairId = word2 }
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
            var request = new AuthorizedRequestObject<WordSetWordsRequest, WordSetWordsReply>(requestData)
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
            var request = new AuthorizedRequestObject<WordSetWordsRequest, WordSetWordsReply>(requestData)
            {
                UserId = context.Users.First().UserId
            };
            context.UserWordPairs.Add(new UserWordPair()
            {
                UserId = context.Users.First().UserId,
                WordPairId = context.Games.First().GameLevels.First().GameLevelWords.First().WordPairId
            }); ;
            context.SaveChanges();
            // act
            var reply = await new GetMarkedWordsHandler(context).Handle(request);

            // assert
            Assert.Single(reply.Words.Where(d => d.HasAdded.Equals(true)));
            Assert.Single(reply.Words.Where(d => d.HasAdded.Equals(false)));
        }
    }
}
