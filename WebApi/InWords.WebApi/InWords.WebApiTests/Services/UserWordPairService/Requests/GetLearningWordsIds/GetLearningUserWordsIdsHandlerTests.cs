using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWordsIds;
using InWords.WebApiTests.TestUtils;
using System;
using System.Linq;
using Xunit;

namespace InWords.WebApiTests.Services.UserWordPairService.Requests.GetLearningWordsIds
{
    public class GetLearningUserWordsIdsHandlerTests
    {
        [Fact]
        public async void HandleWords()
        {
            var userId = 1;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();

            var pair = new WordPair() { WordForeign = new Word(), WordNative = new Word() };
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId + 1, TimeGap = DateTime.UtcNow.AddDays(-5), WordPair = pair });
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(-5), WordPair = pair });
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(-1), WordPair = pair });
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(1), WordPair = pair });
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(2), WordPair = pair });
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId, TimeGap = DateTime.UtcNow.AddDays(3), WordPair = pair });
            context.UserWordPairs.Add(new UserWordPair() { UserId = userId + 1, TimeGap = DateTime.UtcNow.AddDays(3), WordPair = pair });

            context.SaveChanges();

            var words = new GetLearningUserWordsId(context);
            var test = await words.Handle(new GetLearningUserWordsIdQuery(userId)).ConfigureAwait(false);

            Assert.Equal(3, test.Count());
        }
    }
}
