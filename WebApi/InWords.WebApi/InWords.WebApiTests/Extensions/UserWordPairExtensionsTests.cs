using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InWords.Data;
using InWords.WebApi.Extensions;
using InWords.Data.Domains;
using InWords.WebApiTests.Controllers.v1._0;
using Xunit;

namespace InWords.WebApiTests.Extensions
{
    public class UserWordPairExtensionsTests
    {
        [Fact]
        public async Task WhereAnyTestUserWordPairTest()
        {
            // prepare
            var userWordPairsList = new List<int>() { 2, 3, 4 };
            var expectedWordPairsList = new List<int>() { 3, 4, 4 };

            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            context.UserWordPairs.Add(new UserWordPair() { UserId = 1, UserWordPairId = 1, WordPairId = 2 }); // Bad
            context.UserWordPairs.Add(new UserWordPair() { UserId = 1, UserWordPairId = 2, WordPairId = 3 }); // Good 
            context.UserWordPairs.Add(new UserWordPair() { UserId = 1, UserWordPairId = 3, WordPairId = 4 }); // Good
            context.UserWordPairs.Add(new UserWordPair() { UserId = 2, UserWordPairId = 4, WordPairId = 4 }); // Good
            context.UserWordPairs.Add(new UserWordPair() { UserId = 2, UserWordPairId = 5, WordPairId = 3 }); // Bad
            await context.SaveChangesAsync().ConfigureAwait(false);

            // act

            var actualList = context.UserWordPairs.WhereAny(userWordPairsList).Select(d=>d.WordPairId).ToList();

            // assert
            Assert.Equal(expectedWordPairsList,actualList);
        }
    }
}
