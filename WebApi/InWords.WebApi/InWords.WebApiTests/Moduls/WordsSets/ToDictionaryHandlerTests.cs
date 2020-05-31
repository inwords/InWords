using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using MediatR;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace InWords.WebApiTests.Moduls.WordsSets
{
    public class ToDictionaryHandlerTests
    {
        [Fact]
        public async Task ToDictionary_ShouldBeOk()
        {

            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await CreateTestContext(context);
            WordSetWordsRequest requestData = new WordSetWordsRequest()
            {
                WordSetId = context.Games.First().GameId
            };
            var request = new AuthReq<WordSetWordsRequest, Empty>(requestData)
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

            var mock = new Mock<IRequestHandler<AuthReq<AddWordsRequest, AddWordsReply>, AddWordsReply>>();
            mock.Setup(a => a.Handle(It.Is(IsGameOne()), It.IsAny<CancellationToken>()));

            var reply = await new ToDictionaryHandler(context, mock.Object).Handle(request);

            // assert
            mock.Verify(a => a.Handle(It.Is(IsGameOne()), It.IsAny<CancellationToken>()), Times.Once());
        }

        private static Expression<Func<AuthReq<AddWordsRequest, AddWordsReply>, bool>> IsGameOne()
        {
            return d => d.UserId == 1 && d.Value.Words.Count == 2
                                && d.Value.Words.Any(d => d.WordForeign == "test4")
                                && d.Value.Words.Any(d => d.WordForeign == "test5")
                                && d.Value.Words.Any(d => d.WordNative == "тест4")
                                && d.Value.Words.Any(d => d.WordNative == "тест5");
        }

        private static async Task CreateTestContext(InWordsDataContext context)
        {
            await context.AddAccount(1);

            context.Languages.AddLanguages();

            HashSet<GameLevelWord> gameLevelWords1 = new HashSet<GameLevelWord>
            {
                new GameLevelWord() { NativeWord = "тест4", ForeignWord = "test4" },
                new GameLevelWord() { NativeWord = "тест5", ForeignWord ="test5"}
            };
            CreateGame(gameLevelWords1, context);
            await context.SaveChangesAsync();

            HashSet<GameLevelWord> gameLevelWords2 = new HashSet<GameLevelWord>
            {
                new GameLevelWord() { NativeWord = "тест6", ForeignWord = "test6" },
                new GameLevelWord() { NativeWord = "тест7", ForeignWord ="test7"}
            };
            CreateGame(gameLevelWords2, context);

            await context.SaveChangesAsync();
        }

        private static void CreateGame(HashSet<GameLevelWord> words, InWordsDataContext context)
        {
            HashSet<GameLevel> gameLevels1 = new HashSet<GameLevel>
            {
                new GameLevel()
                {
                    GameLevelWords = words,
                }
            };

            context.Games.Add(new Game()
            {
                CreatorId = 0,
                GameLevels = gameLevels1
            });
        }
    }
}
