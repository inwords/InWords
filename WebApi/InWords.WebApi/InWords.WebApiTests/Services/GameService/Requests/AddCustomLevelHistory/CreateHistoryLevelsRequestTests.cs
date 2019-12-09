using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.DTO.Games.Levels;
using InWords.Data.Enums;
using InWords.WebApi.Services.GameService.Requests.AddCustomLevelHistory;
using InWords.WebApi.Services.GameService.Requests.SendLevelsMetric;
using InWords.WebApiTests.Controllers.v1._0;
using Xunit;

namespace InWords.WebApiTests.Services.GameService.Requests.AddCustomLevelHistory
{
    public class CreateHistoryLevelsRequestTests
    {
        private void CreateContextWithExistedGame(InWordsDataContext context, int userId)
        {
            context.Games.Add(new Game { GameId = 1 });
            context.GameTags.Add(new GameTag() { UserId = userId, Tags = GameTags.CustomLevelsHistory, GameId = 1 });
            context.WordPairs.AddRange(new List<WordPair>()
            {
                new WordPair(){WordPairId = 2},
                new WordPair(){WordPairId = 3},
                new WordPair(){WordPairId = 4},
            });

            context.UserWordPairs.AddRange(new List<UserWordPair>()
            {
                new UserWordPair(){UserWordPairId = 1, WordPairId = 2,UserId = userId},
                new UserWordPair(){UserWordPairId = 2, WordPairId = 3,UserId = userId},
                new UserWordPair(){UserWordPairId = 3, WordPairId = 4,UserId = userId},
            });

        }

        [Fact]
        public async void HistoryLevelHistoryGameExistWordsExists()
        {
            const int userId = 1;
            // initialise
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            CreateContextWithExistedGame(context, userId);
            await context.SaveChangesAsync().ConfigureAwait(false);

            var testQuery = new CustomLevelMetricQuery()
            {
                UserId = userId,
                Metrics = new List<ClassicCardLevelMetric>()
                {
                    new ClassicCardLevelMetric()
                    {
                        GameLevelId = 0,
                        WordPairIdOpenCounts = new Dictionary<int, int>()
                        {
                            { 1, 4 },
                            { 2, 5},
                            { 3, 1}
                        }
                    }
                }.ToImmutableArray()
            };


            // act
            var handler = new CreateHistoryLevelsRequest(context);
            CustomLevelMetricQuery actualResult = await handler.Handle(testQuery).ConfigureAwait(false);

            // assert
            var expectedLevels = 1;
            List<GameLevel> actualLevels = context.GameLevels.Where(g => g.GameId.Equals(1)).ToList();
            Assert.Equal(expectedLevels, actualLevels.Count);
            var expectedLevelWords = 3;
            var actualLevelWords = context.GameLevelWords
                .Where(d => actualLevels.Contains(d.GameLevel));
            Assert.Equal(expectedLevelWords, actualLevelWords.Count());

            Assert.Equal(4, actualResult.Metrics[0].WordPairIdOpenCounts[2]);

            context.Dispose();
        }

        [Fact]
        public async void GameThereAreNoWordsInTheDatabase()
        {
            // initialise
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            context.Games.Add(new Game { GameId = 1 });
            context.GameTags.Add(new GameTag() { UserId = 1, Tags = GameTags.CustomLevelsHistory, GameId = 1 });
            var testQuery = new CustomLevelMetricQuery()
            {
                UserId = 1,
                Metrics = new List<ClassicCardLevelMetric>()
                {
                    new ClassicCardLevelMetric()
                    {
                        GameLevelId = 0,
                        WordPairIdOpenCounts = new Dictionary<int, int>()
                        {
                            { 1, 2},
                            { 2, 3},
                            { 3, 4}
                        }
                    }
                }.ToImmutableArray()
            };
            await context.SaveChangesAsync().ConfigureAwait(false);


            // act
            var handler = new CreateHistoryLevelsRequest(context);

            // assert
            await Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => handler.Handle(testQuery)).ConfigureAwait(false);
            context.Dispose();
        }
    }
}
