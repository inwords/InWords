using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.DictionaryServiceHandler.Words;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System.Linq;
using Xunit;

namespace InWords.WebApiTests.Services.DictionaryService.Words
{
    public class AddWordsTests
    {
        [Fact]
        public async void AddUserWordPair()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();

            AddWordsRequest addWordsRequest = new AddWordsRequest();
            addWordsRequest.Words.Add(new AddWordRequest() { LocalId = 0, WordForeign = "0", WordNative = "0-0" });
            addWordsRequest.Words.Add(new AddWordRequest() { LocalId = 2, WordForeign = "2", WordNative = "2-2" });

            // act
            var requestObject = new AuthorizedRequestObject<AddWordsRequest, AddWordsReply>(addWordsRequest)
            {
                UserId = userId
            };

            var addWords = new AddWords(context);
            AddWordsReply response = await addWords.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(2, context.UserWordPairs.Count());
            Assert.Equal(2, response.WordIds.Where(d => d.ServerId > 0).Count());
        }

        [Fact]
        public async void AddUserWordPairNoId()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();

            AddWordsRequest addWordsRequest = new AddWordsRequest();
            addWordsRequest.Words.Add(new AddWordRequest() { LocalId = 0, WordForeign = "0", WordNative = "0-0" });
            addWordsRequest.Words.Add(new AddWordRequest() { LocalId = 0, WordForeign = "2", WordNative = "2-2" });

            // act
            var requestObject = new AuthorizedRequestObject<AddWordsRequest, AddWordsReply>(addWordsRequest)
            {
                UserId = userId
            };

            var registration = new AddWords(context);
            AddWordsReply response = await registration.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(2, context.UserWordPairs.Count());
        }
    }
}
