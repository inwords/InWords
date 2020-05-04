using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Protobuf;
using InWords.WebApi.Modules.ClassicCardGame;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;
using static InWords.Protobuf.CardGameMetrics.Types;

namespace InWords.WebApiTests.Moduls.ClassicCardGame
{
    public class EstimateClassicCardGameTests
    {
        [Fact]
        public async void EstimateExistedLevel()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();

            context.Games.Add(new Game()
            {
                GameId = 1,
                CreatorId = 1,
            });
            context.SaveChanges();
            context.GameLevels.Add(new GameLevel()
            {
                GameId = 1,
                GameLevelId = 1,
            });
            context.SaveChanges();

            CardGameMetrics cardGameMetrics = new CardGameMetrics();

            var game1Metric = new CardGameMetric()
            {
                GameLevelId = 1
            };
            game1Metric.WordIdOpenCount.Add(1, 2);
            game1Metric.WordIdOpenCount.Add(2, 2);

            cardGameMetrics.Metrics.Add(game1Metric);

            // act
            var requestObject = new AuthorizedRequestObject<CardGameMetrics, LevelPoints>(cardGameMetrics)
            {
                UserId = userId
            };


            var handler = new EstimateClassicCardGame(context);
            LevelPoints response = await handler.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Single(response.Points);
            Assert.Equal(3, response.Points.First().Score);
            Assert.Equal(3, context.UserGameLevels.First().UserStars);
        }

        [Fact]
        public async void GetLowerScoreButHigherExist_KeepHigherScore() 
        {
            int userId = 1;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            context.Games.Add(new Game()
            {
                GameId = 1,
                CreatorId = 1,
            });
            context.SaveChanges();
            context.GameLevels.Add(new GameLevel()
            {
                GameId = 1,
                GameLevelId = 1,
            });
            context.UserGameLevels.Add(new UserGameLevel()
            {
                GameLevelId = 1,
                UserId = userId,
                UserStars = 3 // higher score
            });


            CardGameMetrics cardGameMetrics = new CardGameMetrics();

            var game1Metric = new CardGameMetric()
            {
                GameLevelId = 1
            };
            game1Metric.WordIdOpenCount.Add(1, 100); // bad score
            cardGameMetrics.Metrics.Add(game1Metric);

            // act
            var requestObject = new AuthorizedRequestObject<CardGameMetrics, LevelPoints>(cardGameMetrics)
            {
                UserId = userId
            };

            var handler = new EstimateClassicCardGame(context);
            LevelPoints response = await handler.HandleRequest(requestObject).ConfigureAwait(false);

            Assert.Single(response.Points);
            Assert.Equal(3, response.Points.First().Score);
            Assert.Equal(3, context.UserGameLevels.First().UserStars);
        }
    }
}
