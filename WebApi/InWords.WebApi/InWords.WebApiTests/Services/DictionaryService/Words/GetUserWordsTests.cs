using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.DictionaryService.Words;
using InWords.WebApiTests.TestUtils;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Xunit;

namespace InWords.WebApiTests.Services.DictionaryService.Words
{
    public class GetUserWordsTests
    {
        [Fact]
        public async void GetUserWords()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();
            context.Add(CreateUserWordPair(userId, "0", "0-0"));
            context.Add(CreateUserWordPair(userId, "1", "1-1"));
            context.Add(CreateUserWordPair(userId, "3", "3-3"));
            context.Add(CreateUserWordPair(otherId, "2", "2-2"));
            await context.SaveChangesAsync();
            // act
            var service = new GetUserWords(context);
            var requestData = new GetWordsRequest();
            var request = new AuthorizedRequestObject<GetWordsRequest, WordsReply>(requestData);
            var reply = await service.Handle(request, default);
            // assert
            Assert.Equal(context.UserWordPairs.Where(d => d.UserId == userId).Count(), reply.ToAdd.Count());
            Assert.Empty(reply.ToDelete);
        }

        private UserWordPair CreateUserWordPair(int userId, string wordForeign, string wordNative)
        {
            return new UserWordPair()
            {
                UserId = userId,
                WordPair = new WordPair()
                {
                    WordForeign = new Word(wordForeign),
                    WordNative = new Word(wordNative)
                },
            };
        }
    }
}
