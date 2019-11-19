using System;
using System.Linq;
using InWords.Data.Domains;
using InWords.WebApi.Extensions.InWordsDataContext;
using InWords.WebApi.Services.UserWordPairService.Models;
using InWords.WebApi.Services.UserWordPairService.Requests;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords;

namespace InWords.WebApi.Services.UserWordPairService.Extension
{
    public static class UserWordPairExtension
    {
        public static KnowledgeLicense GetLicense(this UserWordPair userWordPair)
        {
            var knowledgeLicense = new KnowledgeLicense
            {
                Period = userWordPair.LearningPeriod,
                RepeatTime = userWordPair.TimeGap
            };
            return knowledgeLicense;
        }

        public static UserWordPair SetLicense(this UserWordPair userWordPair, KnowledgeLicense knowledgeLicense)
        {
            userWordPair.LearningPeriod = knowledgeLicense.Period;
            userWordPair.TimeGap = knowledgeLicense.RepeatTime;
            return userWordPair;
        }

        public static IQueryable<UserWordPair> SelectPairsToLearn(this IQueryable<UserWordPair> userWordPairs, DateTime currentPeriod)
        {
            return userWordPairs.Where(uwp => uwp.TimeGap < currentPeriod);
        }

        public static IQueryable<UserWordPair> QueryPairsToLearn(this IQueryable<UserWordPair> userWordPairs, GetLearningUserWordsQueryBase request)
        {
            var currentPeriod = DateTime.UtcNow.AddDays(request.DaysForward);
            var wp = userWordPairs.SelectUsersWordPairs(request.UserId);
            var pairsToLearn = wp.SelectPairsToLearn(currentPeriod);
            return pairsToLearn;
        }
    }
}