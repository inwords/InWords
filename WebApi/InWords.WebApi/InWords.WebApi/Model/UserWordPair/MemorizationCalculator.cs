using InWords.Data.DTO.Enums;
using InWords.WebApi.Model.UserWordPair.MemorizationLevels;
using System;
using System.Collections.Generic;

namespace InWords.WebApi.Model.UserWordPair
{
    public static class MemorizationCalculator
    {
        private const int DAYS_GRANTING_TIMESPAN = 1;
        private static readonly Dictionary<KnowledgeQualities, BaseMemorization> KnowledgeLicenseProviders
            = new Dictionary<KnowledgeQualities, BaseMemorization>
        {
            {KnowledgeQualities.EasyToRemember, new ExcellentMemorization()},
            {KnowledgeQualities.StillRemember, new SatisfactoryMemorization()},
            {KnowledgeQualities.NoLongerRemember, new UncertainMemorization()}
        };

        public static Memorization Update(Memorization knowledgeLicense, KnowledgeQualities knowledgeQuality,double complexity)
        {
            if (IsOkButBeforeTime(knowledgeLicense, knowledgeQuality))
                knowledgeQuality = KnowledgeQualities.StillRemember;
            return KnowledgeLicenseProviders[knowledgeQuality].Grant(knowledgeLicense,complexity);
        }

        private static bool IsOkButBeforeTime(Memorization knowledgeLicense, KnowledgeQualities knowledgeQuality)
        {
            return knowledgeQuality.Equals(KnowledgeQualities.EasyToRemember) && IsBefore(knowledgeLicense);
        }

        private static bool IsBefore(Memorization knowledgeLicense)
        {
            return knowledgeLicense.RepeatTime > DateTime.UtcNow.AddDays(DAYS_GRANTING_TIMESPAN);
        }
    }
}
