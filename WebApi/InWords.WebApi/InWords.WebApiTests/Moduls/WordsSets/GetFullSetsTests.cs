using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace InWords.WebApiTests.Moduls.WordsSets
{
    public class GetFullSetsTests
    {
        [Fact]
        public async Task GetFullSet_ReturnAll()
        {
            // arrange
            int userId = 1;
            using InWordsDataContext context = InWordsDataContextFactory.Create();
            AddGame(context);
            AddGame(context);
            context.SaveChanges();

            // act
            var data = new SetsCountRequest() { Limit = 50, Offset = 0 };
            var request = new AuthReq<SetsCountRequest, WordSetReply>(data)
            {
                UserId = userId
            };
            WordSetReply result = await new GetFullSets(context).HandleRequest(request);

            // assert
            Assert.True(result.WordSets.Any());
        }

        private void AddGame(InWordsDataContext context)
        {
            Game game = new Game()
            {
                GameLevels = new HashSet<GameLevel>
                {
                    new GameLevel()
                    {
                        GameLevelWords = new HashSet<GameLevelWord>()
                        {
                            new GameLevelWord() { NativeWord = "1", ForeignWord = "1-1" },
                            new GameLevelWord() { NativeWord = "2", ForeignWord = "2-2" }
                        }
                    }
                }
            };
            GameTag gameTag = new GameTag()
            {
                Game = game,
                Tags = GameTags.Official
            };
            context.Add(game);
            context.Add(gameTag);
        }
    }
}
