using InWords.Data.Domains;
using InWords.WebApi.Extensions.InWordsDataContext;
using InWords.WebApi.Services.UserWordPairService.Models;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWordsIds;
using System;
using System.Linq;

namespace InWords.WebApi.Services.UserWordPairService.Extension
{
    public static class UserWordPairTraining
    {
        public static Memorization GetLicense(this UserWordPair userWordPair)
        {
            var knowledgeLicense = new Memorization
            {
                Period = userWordPair.LearningPeriod,
                RepeatTime = userWordPair.TimeGap
            };
            return knowledgeLicense;
        }

        public static UserWordPair SetLicense(this UserWordPair userWordPair, Memorization knowledgeLicense)
        {
            userWordPair.LearningPeriod = knowledgeLicense.Period;
            userWordPair.TimeGap = knowledgeLicense.RepeatTime;
            return userWordPair;
        }

        public static IQueryable<UserWordPair> SelectPairsToLearn(this IQueryable<UserWordPair> userWordPairs, DateTime currentPeriod)
        {
            return userWordPairs.Where(uwp => uwp.TimeGap < currentPeriod);
        }

        public static IQueryable<UserWordPair> QueryPairsToLearn(this IQueryable<UserWordPair> userWordPairs, GetLearningUserWordsIdQuery request)
        {
            var currentPeriod = DateTime.UtcNow.AddDays(request.DaysForward);
            var wp = userWordPairs.WhereUser(request.UserId);
            var pairsToLearn = wp.SelectPairsToLearn(currentPeriod);
            return pairsToLearn;
        }

        public static IQueryable<UserWordPair> QueryPairsToLearn(this IQueryable<UserWordPair> userWordPairs, GetLearningUserWordsQuery request)
        {
            var currentPeriod = DateTime.UtcNow.AddDays(request.DaysForward);
            var wp = userWordPairs.WhereUser(request.UserId);
            var pairsToLearn = wp.SelectPairsToLearn(currentPeriod);
            return pairsToLearn;
        }
    }
}