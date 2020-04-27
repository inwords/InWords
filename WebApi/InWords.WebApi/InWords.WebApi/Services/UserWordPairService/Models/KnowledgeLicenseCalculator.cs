using InWords.Data.DTO.Enums;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;
using InWords.WebApi.Services.UserWordPairService.Models.LicenseProviders;
using System;
using System.Collections.Generic;

namespace InWords.WebApi.Services.UserWordPairService.Models
{
    public static class KnowledgeLicenseCalculator
    {
        private const int DAYS_GRANTING_TIMESPAN = 1;
        private static readonly Dictionary<KnowledgeQualities, KnowledgeLicenseProvider> KnowledgeLicenseProviders
            = new Dictionary<KnowledgeQualities, KnowledgeLicenseProvider>
        {
            {KnowledgeQualities.EasyToRemember, new ExcellentKnowledge()},
            {KnowledgeQualities.StillRemember, new SatisfactoryKnowledge()},
            {KnowledgeQualities.NoLongerRemember, new UncertainKnowledge()}
        };

        public static Memorization Update(Memorization knowledgeLicense, KnowledgeQualities knowledgeQuality)
        {
            if (IsEasyButEarlyToRepeat(knowledgeLicense, knowledgeQuality))
                knowledgeQuality = KnowledgeQualities.StillRemember;
            return KnowledgeLicenseProviders[knowledgeQuality].Grant(knowledgeLicense);
        }

        private static bool IsEasyButEarlyToRepeat(Memorization knowledgeLicense, KnowledgeQualities knowledgeQuality)
        {
            return knowledgeQuality.Equals(KnowledgeQualitys.EasyToRemember) && IsNotGrantingTime(knowledgeLicense);
        }

        private static bool IsNotGrantingTime(Memorization knowledgeLicense)
        {
            return knowledgeLicense.RepeatTime > DateTime.UtcNow.AddDays(DAYS_GRANTING_TIMESPAN);
        }
    }
}
