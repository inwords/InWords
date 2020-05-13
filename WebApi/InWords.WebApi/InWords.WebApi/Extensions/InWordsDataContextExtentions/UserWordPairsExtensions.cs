using InWords.Common.Extensions;
using InWords.Data.Domains;
using InWords.Data.DTO.Enums;
using InWords.WebApi.Model.UserWordPair;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Extensions.InWordsDataContextExtentions
{
    public static class UserWordPairsExtensions
    {
        public static Memorization Memorization(this UserWordPair userWordPair)
        {
            if (userWordPair == null)
                throw new ArgumentNullException(nameof(userWordPair));
            Memorization memorization = new Memorization
            {
                Period = userWordPair.LearningPeriod,
                RepeatTime = userWordPair.TimeGap
            };
            return memorization;
        }
        public static IQueryable<UserWordPair> WhereUser(this IQueryable<UserWordPair> userWordPairs, int userId)
        {
            return userWordPairs.Where(uwp => uwp.UserId.Equals(userId));
        }

        public static IEnumerable<UserWordPair> UpdateMemorisation(this IEnumerable<UserWordPair> userWordPairs, Dictionary<int, KnowledgeQualities> knowledgeQualifiers, double complexity)
        {
            userWordPairs.ForEach(w =>
            {
                var updatedMemorization = MemorizationCalculator.Update(w.Memorization(), knowledgeQualifiers[w.UserWordPairId],complexity);
                w.LearningPeriod = updatedMemorization.Period;
                w.TimeGap = updatedMemorization.RepeatTime;
            });
            return userWordPairs;
        }
    }
}
