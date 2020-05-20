using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System.Linq;
using Xunit;
using static InWords.Protobuf.TrainingDataRequest.Types;
using static InWords.Protobuf.TrainingDataRequest.Types.Training.Types;

namespace InWords.WebApiTests.Moduls.WordsSets
{
    public class EstimateTrainingTests
    {
        [Fact]
        public async void EstimateTraining_Returns6Stars()
        {
            // arrange
            int userId = 1;
            using InWordsDataContext context = InWordsDataContextFactory.Create();
            Game game = new Game() { };
            context.Add(game);
            context.SaveChanges();
            GameLevel gameLevel = new GameLevel() { GameId = game.GameId };
            context.Add(gameLevel);
            context.SaveChanges();
            await context.AddAccount(userId);
            await context.SaveChangesAsync();

            // act
            TrainingDataRequest trainingDataRequest = new TrainingDataRequest();
            Training training = new Training {};
            training.ClosedCardsMetric = new ClosedCardsMetric();
            training.ClosedCardsMetric.WordIdOpenCount.Add(1, 4);
            training.ClosedCardsMetric.WordIdOpenCount.Add(2, 4);
            training.ClosedCardsMetric.WordIdOpenCount.Add(3, 2);
            training.OpenedCardGameMetric = new OpenedCardGameMetric();
            training.OpenedCardGameMetric.WordIdOpenCount.Add(1, 3);
            training.OpenedCardGameMetric.WordIdOpenCount.Add(2, 2);
            training.OpenedCardGameMetric.WordIdOpenCount.Add(3, 2);
            trainingDataRequest.Metrics.Add(training);

            var requestData = new AuthorizedRequestObject<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest)
            {
                UserId = userId
            };
            var requestHandler = new EstimateTraining(context);
            var result = await requestHandler.HandleRequest(requestData);
            // assert
            Assert.Single(result.Scores);
            Assert.Equal(6, result.Scores.Single().ClosedCards.Score);
            Assert.Equal(5, result.Scores.Single().OpenedCardGame.Score);
            Assert.Equal(6, result.Scores.Single().Score);
        }

        [Fact]
        public async void EstimateCardGame_Returns6Stars()
        {
            // arrange
            int userId = 1;
            using InWordsDataContext context = InWordsDataContextFactory.Create();
            Game game = new Game() { };
            context.Add(game);
            context.SaveChanges();
            GameLevel gameLevel = new GameLevel() { GameId = game.GameId };
            context.Add(gameLevel);
            context.SaveChanges();
            await context.AddAccount(userId);
            await context.SaveChangesAsync();

            // act
            TrainingDataRequest trainingDataRequest = new TrainingDataRequest();
            Training training = new Training { GameLevelId = 1 };
            training.ClosedCardsMetric = new ClosedCardsMetric();
            training.ClosedCardsMetric.WordIdOpenCount.Add(1, 4);
            training.ClosedCardsMetric.WordIdOpenCount.Add(2, 4);
            training.ClosedCardsMetric.WordIdOpenCount.Add(3, 2);
            trainingDataRequest.Metrics.Add(training);

            var requestData = new AuthorizedRequestObject<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest)
            {
                UserId = userId
            };
            var requestHandler = new EstimateTraining(context);
            var result = await requestHandler.Handle(requestData);
            // assert
            Assert.Single(result.Scores);
            Assert.Equal(6, result.Scores.Single().ClosedCards.Score);
            Assert.Equal(6, result.Scores.Single().Score);
        }

        [Fact]
        public async void EstimateAudioGame_Returns5Stars()
        {
            // arrange
            int userId = 1;
            using InWordsDataContext context = InWordsDataContextFactory.Create();
            Game game = new Game() { };
            context.Add(game);
            context.SaveChanges();
            GameLevel gameLevel = new GameLevel() { GameId = game.GameId };
            context.Add(gameLevel);
            context.SaveChanges();
            await context.AddAccount(userId);
            await context.SaveChangesAsync();

            // act
            TrainingDataRequest trainingDataRequest = new TrainingDataRequest();
            Training training = new Training { GameLevelId = 1 };
            training.OpenedCardGameMetric = new OpenedCardGameMetric();
            training.OpenedCardGameMetric.WordIdOpenCount.Add(1, 3);
            training.OpenedCardGameMetric.WordIdOpenCount.Add(2, 2);
            training.OpenedCardGameMetric.WordIdOpenCount.Add(3, 2);
            trainingDataRequest.Metrics.Add(training);

            var requestData = new AuthorizedRequestObject<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest)
            {
                UserId = userId
            };
            var requestHandler = new EstimateTraining(context);
            var result = await requestHandler.Handle(requestData);
            // assert
            Assert.Single(result.Scores);
            Assert.Equal(5, result.Scores.Single().OpenedCardGame.Score);
            Assert.Equal(5, result.Scores.Single().Score);
        }

        [Fact]
        public async void EstimateAudioGame_Returns6Stars()
        {
            // arrange
            int userId = 1;
            using InWordsDataContext context = InWordsDataContextFactory.Create();
            Game game = new Game() { };
            context.Add(game);
            context.SaveChanges();
            GameLevel gameLevel = new GameLevel() { GameId = game.GameId };
            context.Add(gameLevel);
            context.SaveChanges();
            await context.AddAccount(userId);
            await context.SaveChangesAsync();

            // act
            TrainingDataRequest trainingDataRequest = new TrainingDataRequest();
            Training training = new Training { GameLevelId = 1 };
            training.OpenedCardGameMetric = new OpenedCardGameMetric();
            training.OpenedCardGameMetric.WordIdOpenCount.Add(1, 2);
            training.OpenedCardGameMetric.WordIdOpenCount.Add(2, 2);
            trainingDataRequest.Metrics.Add(training);

            var requestData = new AuthorizedRequestObject<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest)
            {
                UserId = userId
            };
            var requestHandler = new EstimateTraining(context);
            var result = await requestHandler.Handle(requestData);
            // assert
            Assert.Single(result.Scores);
            Assert.Equal(6, result.Scores.Single().OpenedCardGame.Score);
            Assert.Equal(6, result.Scores.Single().Score);
        }
    }
}
