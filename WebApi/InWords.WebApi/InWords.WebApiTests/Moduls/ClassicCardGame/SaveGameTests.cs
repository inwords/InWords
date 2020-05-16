using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.ClassicCardGame;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using MediatR;
using Moq;
using System.Linq;
using System.Threading;
using Xunit;
using static InWords.Protobuf.CardGameInfos.Types;

namespace InWords.WebApiTests.Moduls.ClassicCardGame
{
    public class SaveGameTests
    {
        [Fact]
        public async void SaveLevels_CreateGame()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();

            CardGameInfos cardGameMetrics = new CardGameInfos();
            context.UserWordPairs.Add(new UserWordPair()
            {
                UserWordPairId = 1,
                ForeignWord = "foreign1",
                NativeWord = "native1",
                UserId = 1
            });
            context.UserWordPairs.Add(new UserWordPair()
            {
                UserWordPairId = 2,
                ForeignWord = "foreign2",
                NativeWord = "native2",
                UserId = 1
            });
            context.SaveChanges();

            var game1Metric = new CardGameInfo();
            game1Metric.WordIdOpenCount.Add(1, 2);
            game1Metric.WordIdOpenCount.Add(2, 2);
            cardGameMetrics.Info.Add(game1Metric);

            // act
            var requestObject = new AuthorizedRequestObject<CardGameInfos, LevelPoints>(cardGameMetrics)
            {
                UserId = userId
            };

            var mock = new Mock<IRequestHandler<AuthorizedRequestObject<CardGameMetrics, LevelPoints>, LevelPoints>>();
            mock.Setup(a => a.Handle(It.IsAny<AuthorizedRequestObject<CardGameMetrics, LevelPoints>>(), It.IsAny<CancellationToken>()));

            var handler = new SaveLevels(context, mock.Object);
            LevelPoints response = await handler.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Single(context.Games);
            Assert.Single(context.GameTags);
            Assert.Equal(GameTags.CustomLevelsHistory, context.GameTags.First().Tags);
            Assert.Single(context.GameLevels);

            Assert.Equal(2, context.GameLevelWords.Count());
            Assert.Equal(context.GameLevels.First().GameLevelId, context.GameLevelWords.First().GameLevelId);
            Assert.Equal(context.Games.First().GameId, context.GameLevels.First().GameId);

            mock.Verify(a => a.Handle(
                It.IsAny<AuthorizedRequestObject<CardGameMetrics, LevelPoints>>(),
                It.IsAny<CancellationToken>()),
                Times.Once());
        }
    }
}
