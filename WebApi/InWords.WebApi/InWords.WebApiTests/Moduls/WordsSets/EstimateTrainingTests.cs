using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using Org.BouncyCastle.Ocsp;
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
            Training training = new Training { };
            training.ClosedCardsMetric = new ClosedCardsMetric();
            training.ClosedCardsMetric.WordIdOpenCount.Add(1, 4);
            training.ClosedCardsMetric.WordIdOpenCount.Add(2, 4);
            training.ClosedCardsMetric.WordIdOpenCount.Add(3, 2);
            training.OpenedCardsMetric = new OpenedCardsMetric();
            training.OpenedCardsMetric.WordIdOpenCount.Add(1, 3);
            training.OpenedCardsMetric.WordIdOpenCount.Add(2, 2);
            training.OpenedCardsMetric.WordIdOpenCount.Add(3, 2);
            trainingDataRequest.Metrics.Add(training);

            var requestData = new AuthReq<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest)
            {
                UserId = userId
            };
            var requestHandler = new EstimateTraining(context);
            var result = await requestHandler.HandleRequest(requestData);
            // assert
            Assert.Single(result.Scores);
            Assert.Equal(6, result.Scores.Single().ClosedCards.Score);
            Assert.Equal(5, result.Scores.Single().OpenedCards.Score);
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

            var requestData = new AuthReq<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest)
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
            training.OpenedCardsMetric = new OpenedCardsMetric();
            training.OpenedCardsMetric.WordIdOpenCount.Add(1, 3);
            training.OpenedCardsMetric.WordIdOpenCount.Add(2, 2);
            training.OpenedCardsMetric.WordIdOpenCount.Add(3, 2);
            trainingDataRequest.Metrics.Add(training);

            var requestData = new AuthReq<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest)
            {
                UserId = userId
            };
            var requestHandler = new EstimateTraining(context);
            var result = await requestHandler.Handle(requestData);
            // assert
            Assert.Single(result.Scores);
            Assert.Equal(5, result.Scores.Single().OpenedCards.Score);
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
            training.OpenedCardsMetric = new OpenedCardsMetric();
            training.OpenedCardsMetric.WordIdOpenCount.Add(1, 2);
            training.OpenedCardsMetric.WordIdOpenCount.Add(2, 2);
            trainingDataRequest.Metrics.Add(training);

            var requestData = new AuthReq<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest)
            {
                UserId = userId
            };
            var requestHandler = new EstimateTraining(context);
            var result = await requestHandler.Handle(requestData);
            // assert
            Assert.Single(result.Scores);
            Assert.Equal(6, result.Scores.Single().OpenedCards.Score);
            Assert.Equal(6, result.Scores.Single().Score);
        }

        
        [Fact]
        public async void CustomGames_SaveOnce()
        {
            int userId = 1;
            using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.SaveChangesAsync();

            EstimateTraining handler = new EstimateTraining(context);

            var payload = new TrainingDataRequest();

            var training = new Training
            {
                AudioMetric = new AudioMetric(),
                ClosedAudioCards2Metric = new ClosedAudioCardsTwoMetric()
            };

            training.AudioMetric.WordIdOpenCount.Add(1, 1);
            training.AudioMetric.WordIdOpenCount.Add(2, 1);
            training.AudioMetric.WordIdOpenCount.Add(3, 1);
            training.ClosedAudioCards2Metric.WordIdOpenCount.Add(1, 1);
            training.ClosedAudioCards2Metric.WordIdOpenCount.Add(2, 1);
            training.ClosedAudioCards2Metric.WordIdOpenCount.Add(3, 1);
            payload.Metrics.Add(training);

            var request = new AuthReq<TrainingDataRequest, TrainingScoreReply>(payload);

            var result = await handler.HandleRequest(request);

            Assert.Single(context.Games);
            Assert.Single(context.GameTags);
            Assert.Equal(GameTags.CustomLevelsHistory, context.GameTags.First().Tags);
            Assert.Single(context.GameLevels);
            Assert.Single(context.Historylevels);
            Assert.Empty(context.GameLevelWords); // Because words 1,2,3 is not not found
        }
    }
}
