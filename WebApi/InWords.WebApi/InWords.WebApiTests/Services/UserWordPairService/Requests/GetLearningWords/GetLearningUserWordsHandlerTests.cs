using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords;
using InWords.WebApiTests.TestUtils;
using System;
using System.Linq;
using Xunit;

namespace InWords.WebApiTests.Services.UserWordPairService.Requests.GetLearningWords
{
    public class GetLearningUserWordsHandlerTests
    {
        [Fact]
        public async void HandleWords()
        {
            var userId = 1;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(-5)});
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(-1)});
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(1)});
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(2)});
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(3)});

            context.SaveChanges();

            var words = new GetLearningUserWords(context);
            var test = await words.Handle(new GetLearningUserWordsQuery(userId)).ConfigureAwait(false);
            Assert.Equal(3, test.Count());
            context.Dispose();
        }

    }
}
