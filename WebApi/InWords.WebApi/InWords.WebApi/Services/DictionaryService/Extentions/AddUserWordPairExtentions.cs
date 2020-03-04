using InWords.Data.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.DictionaryService.Extentions
{
    public static class AddUserWordPairExtentions
    {
        public static void AddUserWordPair(this DbSet<UserWordPair> userWordPairs, IEnumerable<UserWordPair> content)
        {
            var ids = content.Select(d => d.WordPairId).ToArray();
            var addedWords = userWordPairs.Where(u => ids.Any(i => i == u.WordPairId)).ToArray();

            //var pairsToAdd = UserWordPair
            //foreach (var pair in content)
            //{
            //    var addedPair = addedWords.SingleOrDefault(added => added.WordPairId == pair.WordPairId && added.IsInvertPair == pair.IsInvertPair);
            //    if (addedPair == null) 
            //    {

            //    }
            //}
        }
    }
}
