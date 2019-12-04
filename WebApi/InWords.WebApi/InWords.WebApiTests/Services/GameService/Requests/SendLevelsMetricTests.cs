using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.DTO.Games.Levels;
using InWords.Data.Enums;
using InWords.WebApi.Services.GameService.Requests.SendLevelsMetric;
using InWords.WebApiTests.Controllers.v1._0;
using Xunit;

namespace InWords.WebApiTests.Services.GameService.Requests
{
    public class SendLevelsMetricTests
    {
        [Fact]
        public async void HistoryLevel_HistoryGameExist_WordsExists()
        {
            const int userId = 1;
            // initialise
            await using InWordsDataContext context = InWordsDataContextFactory.Create();

            context.Creations.Add(new Creation { CreationId = 1 });
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

            await context.SaveChangesAsync().ConfigureAwait(false);
            
            var testQuery = new ClassicCardLevelMetricQuery()
            {
                UserId = userId,
                Metrics = new List<ClassicCardLevelMetric>()
                {
                    new ClassicCardLevelMetric()
                    {
                        GameLevelId = 0,
                        WordPairIdOpenCounts = new Dictionary<int, int>()
                        {
                            { 1, 1 },
                            { 2, 2},
                            { 3, 3}
                        }
                    }
                }.ToImmutableArray()
            };


            // act
            var handler = new SaveLevelMetric(context);
            var actualResult = await handler.Handle(testQuery).ConfigureAwait(false);

            // assert
            var expectedGameCount = 3;
            var actualLevelsCount = context.GameLevels.Count(g => g.GameBoxId.Equals(1));
            Assert.Equal(expectedGameCount, actualLevelsCount);
            context.Dispose();
        }

        [Fact]
        public async void GameThereAreNoWordsInTheDatabase()
        {
            // initialise
            await using InWordsDataContext context = InWordsDataContextFactory.Create();

            context.Creations.Add(new Creation { CreationId = 1 });
            context.GameTags.Add(new GameTag() { UserId = 1, Tags = GameTags.CustomLevelsHistory, GameId = 1 });

            ClassicCardLevelMetricQuery testQuery = new ClassicCardLevelMetricQuery()
            {
                UserId = 1,
                Metrics = new List<ClassicCardLevelMetric>()
                {
                    new ClassicCardLevelMetric()
                    {
                        GameLevelId = 0,
                        WordPairIdOpenCounts = new Dictionary<int, int>()
                        {
                            { 1, 1 },
                            { 2, 2},
                            { 3, 3}
                        }
                    }
                }.ToImmutableArray()
            };

            await context.SaveChangesAsync().ConfigureAwait(false);

            // act
            var handler = new SaveLevelMetric(context);
            var actualResult = await handler.Handle(testQuery).ConfigureAwait(false);

            // assert
            var expectedGameCount = 3;
            var actualLevelsCount = context.GameLevels.Count(g => g.GameBoxId.Equals(1));
            Assert.Equal(expectedGameCount, actualLevelsCount);
            context.Dispose();
        }
    }
}
