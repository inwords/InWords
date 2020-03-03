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
    public class WordPairsExtentionsTests
    {
        [Fact]
        public async void AddWordPairsLocalMatches()
        {
            // arrange
            using var context = InWordsDataContextFactory.Create();
            var word1 = new Word("1");
            var word2 = new Word("2");
            var word3 = new Word("3");
            var word4 = new Word("4");
            context.Add(word1);
            context.Add(word2);
            context.Add(word3);
            context.Add(word4);
            context.SaveChanges();

            var wordsToAdd = new List<WordPair>()
            {
                { new WordPair() { WordForeignId = word1.WordId, WordNativeId = word2.WordId } }, // match
                { new WordPair() { WordForeignId = word2.WordId, WordNativeId = word1.WordId } }, // match
                { new WordPair() { WordForeignId = word2.WordId, WordNativeId = word3.WordId } },
            };
            // act
            context.WordPairs.AddWordPairs(wordsToAdd);
            context.SaveChanges();

            // assert
            Assert.Equal(2, context.WordPairs.Count());
            Assert.Equal(2, wordsToAdd.Where(w => w.WordPairId > 0).Count());
        }
    }
}
