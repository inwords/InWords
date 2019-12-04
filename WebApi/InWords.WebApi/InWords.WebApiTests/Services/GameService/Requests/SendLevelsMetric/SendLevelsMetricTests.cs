using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.DTO.Games.Levels;
using InWords.WebApi.Services.GameService.Requests.SendLevelsMetric;
using InWords.WebApiTests.Controllers.v1._0;
using Xunit;

namespace InWords.WebApiTests.Services.GameService.Requests.SendLevelsMetric
{
    public class SendLevelsMetricTests
    {
        [Fact]
        public async void UpdateScore()
        {
            using InWordsDataContext context = InWordsDataContextFactory.Create();
            {
                context.Creations.Add(new Creation() { CreationId = 1 });
                context.GameTags.Add(new GameTag() { UserId = 1, GameId = 1 });
                context.GameLevels.Add(new GameLevel() { GameLevelId = 1, GameBoxId = 1 });
                context.UserGameLevels.Add(new UserGameLevel(1, 1));
                context.WordPairs.AddRange(new List<WordPair>()
                {
                    new WordPair(){WordPairId = 2},
                    new WordPair(){WordPairId = 3},
                    new WordPair(){WordPairId = 4},
                });

                ClassicCardLevelMetricQuery request = new ClassicCardLevelMetricQuery()
                {
                    UserId = 1,
                    Metrics = new List<ClassicCardLevelMetric>()
                    {
                        new ClassicCardLevelMetric()
                        {
                            GameLevelId = 1,
                            WordPairIdOpenCounts = new Dictionary<int, int>()
                            {
                                {1, 4},
                                {3, 4},
                                {4, 1}
                            }
                        }
                    }.ToImmutableArray()
                };

                await context.SaveChangesAsync().ConfigureAwait(false);

                ClassicCardLevelMetricQueryResult result = await new SaveLevelMetric(context)
                    .Handle(request)
                    .ConfigureAwait(false);
            }

            var userGameLevel =  context.UserGameLevels.First(u => u.UserId.Equals(1));
            Assert.Equal(3,userGameLevel.UserStars);
        }

        public async void CreateScore()
        {

        }
    }
}
