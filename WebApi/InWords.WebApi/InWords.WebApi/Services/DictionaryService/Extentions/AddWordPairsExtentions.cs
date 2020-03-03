using InWords.Common.Extensions;
using InWords.Data.Domains;
using InWords.WebApi.gRPC.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.DictionaryService.Extentions
{
    public static class AddWordPairsExtentions
    {
        public static void AddWordPairs(this DbSet<WordPair> wordPairs, IEnumerable<WordPair> content)
        {
            if (wordPairs == null)
                throw new ArgumentNullException($"{wordPairs} is null");

            var contentDictionary = content.SelfDistinct();

            var existedPairs = wordPairs.WhereMatches(contentDictionary.Values).ToList();

            var pairsToAdd = new List<WordPair>();
            existedPairs.ForEach(e =>
            {
                if (contentDictionary.IsSamePair(e))
                {
                    var wordPair = contentDictionary.Get(e);
                    wordPair.WordPairId = e.WordPairId;
                }
                else
                {
                    pairsToAdd.Add(e);
                }
            });

            wordPairs.AddRange(pairsToAdd);
        }
        private static Dictionary<(int, int), WordPair> SelfDistinct(this IEnumerable<WordPair> words)
        {
            var dictionary = new Dictionary<(int, int), WordPair>();
            words.ForEach(w =>
            {
                if (!dictionary.IsSamePair(w))
                {
                    dictionary.Add(w);
                }
            });
            return dictionary;
        }

        private static IEnumerable<WordPair> WhereMatches(this IQueryable<WordPair> words, IEnumerable<WordPair> content)
        {
            // todo continue here
            return words.Where(c => content.Any(
                d => c.WordForeignId.Equals(d.WordForeignId) && c.WordNativeId.Equals(d.WordNativeId)
                || c.WordForeignId.Equals(d.WordNativeId) && c.WordNativeId.Equals(d.WordForeignId)));

        }

        private static void Add(this Dictionary<(int, int), WordPair> dictionary, WordPair word)
        {
            dictionary.Add((word.WordNativeId, word.WordForeignId), new WordPair(word.WordNativeId, word.WordForeignId));
        }
        private static bool IsSamePair(this Dictionary<(int, int), WordPair> dictionary, WordPair word)
        {
            return dictionary.IsSamePair(word.WordNativeId, word.WordForeignId);
        }

        private static bool IsSamePair(this Dictionary<(int, int), WordPair> dictionary, int nativeId, int foreignId)
        {
            return dictionary.ContainsKey((nativeId, foreignId)) || dictionary.ContainsKey((foreignId, nativeId));
        }

        public static WordPair Get(this Dictionary<(int, int), WordPair> dictionary, WordPair word)
        {
            if (dictionary == null)
                throw new ArgumentNullException($"{dictionary} is null");

            if (word == null)
                throw new ArgumentNullException($"{word} is null");

            (int, int) key = (word.WordNativeId, word.WordForeignId);
            (int, int) invertedKey = (word.WordForeignId, word.WordNativeId);

            if (dictionary.ContainsKey(key))
            {
                return dictionary[key];
            }
            else if (dictionary.ContainsKey(invertedKey))
            {
                return dictionary[invertedKey];
            }

            throw new ArgumentOutOfRangeException($"{word} does not appear in collection");
        }

    }
}
