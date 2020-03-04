using InWords.Common.Extensions;
using InWords.Data.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Services.DictionaryService.Extentions
{
    public static class AddUserWordPairExtentions
    {
        public static void AddUserWordPair(this DbSet<UserWordPair> userWordPairs, IEnumerable<UserWordPair> request)
        {
            if (userWordPairs == null)
                throw new ArgumentNullException($"{nameof(userWordPairs)}");

            request = request.ToList();
            int userId = request.First().UserId;
            var groups = request.GroupBy(d => d.UserId).ToDictionary(d => d.Key, s => s.ToList());
            if (groups.Keys.Count > 1)
            {
                throw new NotImplementedException();
            }

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
