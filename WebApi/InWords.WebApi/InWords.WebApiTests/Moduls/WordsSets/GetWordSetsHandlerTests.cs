using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using Xunit;

namespace InWords.WebApiTests.Moduls.WordsSets
{
    public class GetWordSetsHandlerTests
    {
        [Fact]
        public async void GetOfficialSets_ShouldBeOk()
        {
            // arrange
            string picture = "testPicture";
            string description = "testdes";
            string title = "testtitle";

            Language language = new Language() { LanguageId = 2, Title = "ru" };
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            Game game = new Game()
            {
                Picture = picture
            };
            context.Add(language);
            context.Add(game);
            await context.SaveChangesAsync();
            CreationDescription creationDescription = new CreationDescription()
            {
                CreationId = game.GameId,
                Description = description,
                LanguageId = 1,
                Title = title,
            };
            context.Add(creationDescription);
            GameTag gameTag = new GameTag()
            {
                GameId = game.GameId,
                Tags = GameTags.Official
            };
            context.Add(gameTag);
            context.SaveChanges();

            // act
            Empty empty = new Empty();
            var request = new AuthorizedRequestObject<Empty, WordSetReply>(empty) { UserId = 0 };
            var reply = await new GetWordSetsHandler(context).Handle(request);

            // assert
            Assert.Single(reply.WordSets);
            Assert.Equal(description, reply.WordSets[0].Description);
            Assert.Equal(title, reply.WordSets[0].Title);
            Assert.Equal(picture, reply.WordSets[0].Picture);
        }
    }
}
