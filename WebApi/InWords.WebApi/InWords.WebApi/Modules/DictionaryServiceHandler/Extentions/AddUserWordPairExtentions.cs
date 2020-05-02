using InWords.Common.Extensions;
using InWords.Data.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Extentions
{
    public static class AddUserWordPairExtentions
    {
        public static void AddUserWordPair(this DbSet<UserWordPair> userWordPairs, IEnumerable<UserWordPair> request)
        {
            if (userWordPairs == null)
                throw new ArgumentNullException($"{nameof(userWordPairs)}");

            request = request.ToList();
            var groups = request.GroupBy(d => d.UserId).ToDictionary(d => d.Key, s => s.ToList());

            foreach (var userId in groups.Keys)
            {
                AddWordsToUser(userWordPairs, groups[userId], userId);
            }
        }

        private static void AddWordsToUser(DbSet<UserWordPair> userWordPairs, IEnumerable<UserWordPair> request, int userId)
        {
            var ids = request.Select(d => d.WordPairId).ToArray();
            var existedWords = userWordPairs.Where(u => u.UserId == userId && ids.Any(i => i == u.WordPairId))
                .ToDictionary(d => (d.WordPairId, d.IsInvertPair));

            var pairsToAdd = new List<UserWordPair>(request.Count());
            foreach (var requestWord in request)
            {
                var key = (requestWord.WordPairId, requestWord.IsInvertPair);
                if (existedWords.ContainsKey(key))
                {
                    requestWord.UserWordPairId = existedWords[key].UserWordPairId;
                }
                else
                {
                    pairsToAdd.Add(requestWord);
                }
            }
            userWordPairs.AddRange(pairsToAdd);
        }
    }
}
