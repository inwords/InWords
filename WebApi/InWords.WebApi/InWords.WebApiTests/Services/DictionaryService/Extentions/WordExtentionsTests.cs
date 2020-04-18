using InWords.Data.Domains;
using InWords.WebApi.Modules.DictionaryService.Extentions;
using InWords.WebApiTests.TestUtils;
using System.Collections.Generic;
using System.Linq;
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

        [Fact]
        public void AddingTheSameWords()
        {
            // arrange
            var context = InWordsDataContextFactory.Create();
            context.Add(new Word("a"));
            context.SaveChanges();
            // act
            IEnumerable<Word> wordsToAdd = new List<Word>()
            {
                new Word("a"),
                new Word("A"),
                new Word("b"),
                new Word("B"),
                new Word("b"),
                new Word("b "),
                new Word("      b ")
            };
            context.Words.AddWords(wordsToAdd);
            context.SaveChanges();
            // assert
            Assert.Equal(2, wordsToAdd.Where(d => d.WordId > 0).Count());
            Assert.Equal(2, context.Words.Count());
        }

        [Fact]
        public void CheckALlInLowercase()
        {
            var context = InWordsDataContextFactory.Create();
            IEnumerable<Word> actual = new List<Word>()
            {
                new Word("A"),
                new Word("B")
            };

            string[] expected = { "a", "b" };

            context.Words.AddWords(actual);
            // assert
            Assert.Equal(expected, actual.Select(e => e.Content));
        }

        [Fact]
        public void AddContentAsWords()
        {
            // arrange
            var context = InWordsDataContextFactory.Create();
            string[] content = { "a", "b", "c" };
            // act
            var actual = context.Words.AddWords(content);
            context.SaveChanges();
            // assert
            Assert.Equal(content.Count(), context.Words.Count());
            Assert.Equal(content.Count(), actual.Where(d => d.WordId > 0).Count());
        }
    }
}
