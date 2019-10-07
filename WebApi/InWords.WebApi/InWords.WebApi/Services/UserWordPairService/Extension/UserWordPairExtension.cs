using InWords.Data.Domains;
using InWords.WebApi.Services.UserWordPairService.Models;

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
    }
}