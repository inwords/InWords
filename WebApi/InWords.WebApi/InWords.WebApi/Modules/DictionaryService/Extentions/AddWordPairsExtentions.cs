using InWords.Common.Extensions;
using InWords.Data.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Modules.DictionaryService.Extentions
{
    public static class AddWordPairsExtentions
    {
        /// <summary>
        /// Return map of inverted keyPair
        /// </summary>
        /// <param name="wordPairs"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        public static HashSet<int> AddWordPairs(this DbSet<WordPair> wordPairs, IEnumerable<WordPair> request)
        {
            if (wordPairs == null)
                throw new ArgumentNullException($"{wordPairs} is null");

            var requestDictionary = request.SelfDistinct();

            // TODO: batch by instert temp table in database
            // continue here  
            var inversionMap = new HashSet<int>(requestDictionary.Count);
            var pairsToAdd = new List<WordPair>(requestDictionary.Count);
            foreach (var requestPair in requestDictionary.Values)
            {
                var existedPair = wordPairs.Where(
                    w => w.WordForeignId == requestPair.WordForeignId && w.WordNativeId == requestPair.WordNativeId
                    || w.WordForeignId == requestPair.WordNativeId && w.WordNativeId == requestPair.WordForeignId).FirstOrDefault();
                if (existedPair == null)
                {
                    pairsToAdd.Add(requestPair);
                }
                else
                {
                    requestPair.WordPairId = existedPair.WordPairId;
                    if (requestPair.WordForeignId != existedPair.WordForeignId)
                    {
                        inversionMap.Add(requestPair.WordPairId);
                    }
                }
            }
            wordPairs.AddRange(pairsToAdd);
            return inversionMap;

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

        private static void Add(this Dictionary<(int, int), WordPair> dictionary, WordPair word)
        {
            dictionary.Add((word.WordNativeId, word.WordForeignId), word);
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
