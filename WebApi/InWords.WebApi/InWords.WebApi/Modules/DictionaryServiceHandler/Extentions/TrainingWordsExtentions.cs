using InWords.Data;
using InWords.Data.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Extentions
{
    public static class TrainingWordsExtentions
    {
        private const int trainingRange = 1;
        public static IQueryable<UserWordPair> TrainingWords(this IQueryable<UserWordPair> userWordPairs, int userId) 
        {
            var timeGap = DateTime.UtcNow.AddDays(trainingRange);
            var userWords = userWordPairs.Where(u => u.UserId == userId);
            return userWords.Where(u => u.TimeGap < timeGap);
        }
    }
}
