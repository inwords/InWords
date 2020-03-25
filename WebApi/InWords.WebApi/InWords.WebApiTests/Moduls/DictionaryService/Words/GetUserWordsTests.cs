using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Modules.DictionaryService.Words;
using InWords.WebApi.Services.Abstractions;
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
            using InWordsDataContext context = InWordsDataContextFactory.Create();
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
            var request = new AuthorizedRequestObject<GetWordsRequest, WordsReply>(requestData)
            {
                UserId = userId
            };
            var reply = await service.HandleRequest(request, default);
            // assert
            Assert.Equal(context.UserWordPairs.Where(d => d.UserId == userId).Count(), reply.ToAdd.Count());
            Assert.Empty(reply.ToDelete);
        }

        [Fact]
        public async void RequestContainsExistedWords()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();
            context.Add(CreateUserWordPair(userId, "0", "0-0", 1));
            context.Add(CreateUserWordPair(userId, "1", "1-1", 2));
            context.Add(CreateUserWordPair(otherId, "2", "2-2", 3));
            context.Add(CreateUserWordPair(userId, "3", "3-3", 4));
            await context.SaveChangesAsync();
            // act
            var service = new GetUserWords(context);
            var requestData = new GetWordsRequest();
            requestData.UserWordpairIds.Add(new int[] { 1, 2, 99, 100 });
            var request = new AuthorizedRequestObject<GetWordsRequest, WordsReply>(requestData)
            {
                UserId = userId
            };
            var reply = await service.HandleRequest(request, default);
            // assert
            Assert.Equal(4, reply.ToAdd[0].UserWordPair);
            Assert.Equal(new int[] { 99, 100 }, reply.ToDelete.ToArray());
        }

        private UserWordPair CreateUserWordPair(int userId, string wordForeign, string wordNative, int id = 0)
        {
            return new UserWordPair()
            {
                UserWordPairId = id,
                UserId = userId,
                ForeignWord = wordForeign,
                NativeWord = wordNative
            };
        }
    }
}
