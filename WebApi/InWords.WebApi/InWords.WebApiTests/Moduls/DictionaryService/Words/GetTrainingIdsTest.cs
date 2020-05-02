using Castle.DynamicProxy.Generators;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Modules.DictionaryServiceHandler.Words;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using System;
using Xunit;

namespace InWords.WebApiTests.Services.DictionaryService.Words
{
    public class GetTrainingIdsTest
    {
        [Fact]
        public async void TrainingIds_Ok()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();
            var time = DateTime.UtcNow;
            context.UserWordPairs.Add(new UserWordPair() { UserWordPairId = 1, UserId = userId, NativeWord = "1", ForeignWord = "1", Background = false, TimeGap = time });
            context.UserWordPairs.Add(new UserWordPair() { UserWordPairId = 2, UserId = userId, NativeWord = "2", ForeignWord = "2", Background = false, TimeGap = time.AddDays(1) });
            context.UserWordPairs.Add(new UserWordPair() { UserWordPairId = 3, UserId = userId, NativeWord = "2", ForeignWord = "2", Background = false, TimeGap = time.AddDays(2) });
            context.UserWordPairs.Add(new UserWordPair() { UserWordPairId = 4, UserId = otherId, NativeWord = "3", ForeignWord = "3", Background = false, TimeGap = time });
            context.SaveChanges();
            // act
            var requestObject = new AuthorizedRequestObject<Empty, TrainingIdsReply>(new Empty())
            {
                UserId = userId
            };

            var addWords = new GetTrainingIds(context);
            TrainingIdsReply response = await addWords.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(2, response.UserWordPairs.Count);
            Assert.Contains(1, response.UserWordPairs);
            Assert.Contains(2, response.UserWordPairs);
        }
        [Fact]
        public async void TrainingIds_Empty() 
        {
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();

            var requestObject = new AuthorizedRequestObject<Empty, TrainingIdsReply>(new Empty())
            {
                UserId = userId
            };

            var addWords = new GetTrainingIds(context);
            TrainingIdsReply response = await addWords.HandleRequest(requestObject).ConfigureAwait(false);
            Assert.Empty(response.UserWordPairs);
        }
    }
}
