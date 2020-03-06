using InWords.WebApiTests.Controllers.v1._0;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.Services.DictionaryService.Extentions
{
    public class AddUserWordPairExtentionsTests
    {
        [Fact]
        public void AddUserWordsPairsTest()
        {
            using var context = InWordsDataContextFactory.Create();
            context.ad
            context.SaveChanges();

            // todo continue here
        }
    }
}
