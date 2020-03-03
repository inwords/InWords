using InWords.Data.Domains;
using InWords.WebApi.Services.DictionaryService.Extentions;
using InWords.WebApiTests.Controllers.v1._0;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.Services.DictionaryService.Extentions
{
    public class WordExtentionsTests
    {
        [Fact]
        public void CheckAllWordsMarkedId()
        {
            // arrange
            var context = InWordsDataContextFactory.Create();
            context.Add(new Word("1"));
            context.SaveChanges();
            // act
            IEnumerable<Word> wordsToAdd = new List<Word>()
            {
                new Word("1"),
                new Word("2")
            };
            context.Words.AddWords(wordsToAdd);
            context.SaveChanges();
            // assert
            Assert.Equal(2, wordsToAdd.Where(d => d.WordId > 0).Count());
            Assert.Equal(2, context.Words.Count());
        }
    }
}
