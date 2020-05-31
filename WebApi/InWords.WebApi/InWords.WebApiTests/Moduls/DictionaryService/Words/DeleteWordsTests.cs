using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Modules.DictionaryServiceHandler.Words;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System.Linq;
using Xunit;

namespace InWords.WebApiTests.Moduls.DictionaryService
{
    public class DeleteWordsTests
    {

        [Fact]
        public async void DeleteUserWordPairs_ShouldBeOk()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();
            context.Add(new UserWordPair()
            {
                UserWordPairId = 1,
                ForeignWord = "Test1",
                NativeWord = "Тест1",
                UserId = userId
            }); ;
            context.Add(new UserWordPair()
            {
                UserWordPairId = 2,
                ForeignWord = "Test2",
                NativeWord = "Тест2",
                UserId = userId
            });
            context.Add(new UserWordPair()
            {
                UserWordPairId = 3,
                ForeignWord = "Test3",
                NativeWord = "Тест3",
                UserId = userId
            });

            await context.SaveChangesAsync();

            DeleteWordsRequest deletewordsRequets = new DeleteWordsRequest();
            deletewordsRequets.Delete.AddRange(new int[] { 1, 3 });

            // act
            var requestObject = new AuthReq<DeleteWordsRequest, Empty>(deletewordsRequets)
            {
                UserId = userId
            };

            var deleteWords = new DeleteWords(context);
            Empty response = await deleteWords.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(1, context.UserWordPairs.Count());
            Assert.Equal("Тест2", context.UserWordPairs.First().NativeWord);
        }

        [Fact]
        public async void DeleteOthersPairs_ShouldBeProhibited()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();
            context.Add(new UserWordPair()
            {
                UserWordPairId = 1,
                ForeignWord = "Test1",
                NativeWord = "Тест1",
                UserId = otherId
            }); ;
            context.Add(new UserWordPair()
            {
                UserWordPairId = 2,
                ForeignWord = "Test2",
                NativeWord = "Тест2",
                UserId = otherId
            });
            context.Add(new UserWordPair()
            {
                UserWordPairId = 3,
                ForeignWord = "Test3",
                NativeWord = "Тест3",
                UserId = otherId
            });

            await context.SaveChangesAsync();

            DeleteWordsRequest deletewordsRequets = new DeleteWordsRequest();
            deletewordsRequets.Delete.AddRange(new int[] { 1, 3 });

            // act
            var requestObject = new AuthReq<DeleteWordsRequest, Empty>(deletewordsRequets)
            {
                UserId = userId
            };

            var deleteWords = new DeleteWords(context);
            Empty response = await deleteWords.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(3, context.UserWordPairs.Count());
        }
    }
}
