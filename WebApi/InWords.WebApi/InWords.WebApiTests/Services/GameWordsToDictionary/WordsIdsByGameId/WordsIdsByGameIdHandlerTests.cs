using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.WebApi.Services.GameWordsToDictionary.WordsIdsByGameId;
using InWords.WebApiTests.TestUtils;
using Xunit;

namespace InWords.WebApiTests.Services.GameWordsToDictionary.WordsIdsByGameId
{
    public class WordsIdsByGameIdHandlerTests
    {
        [Fact]
        public async void HandleWords()
        {
            await using InWordsDataContext context = InWordsDataContextFactory.Create();

            var creation = new Game { GameId = 1 };

            context.Games.Add(creation);
            context.GameLevels.Add(new GameLevel { GameLevelId = 1, GameId = 1 });
            context.GameLevels.Add(new GameLevel { GameLevelId = 2, GameId = 1 });
            context.GameLevelWords.Add(new GameLevelWord { GameLevelId = 1, GameLevelWordId = 1, WordPairId = 1 });
            context.GameLevelWords.Add(new GameLevelWord { GameLevelId = 2, GameLevelWordId = 2, WordPairId = 1 });
            context.GameLevelWords.Add(new GameLevelWord { GameLevelId = 2, GameLevelWordId = 3, WordPairId = 2 });

            context.SaveChanges();

            var words = new WordsIdsByGameIdHandler(context);
            WordsIdsByGameIdQueryResult test =
                await words.Handle(new WordsIdsByGameQuery { Id = 1 })
                    .ConfigureAwait(false);

            Assert.Equal(2, test.WordTranslationsList.Count);
        }
    }
}