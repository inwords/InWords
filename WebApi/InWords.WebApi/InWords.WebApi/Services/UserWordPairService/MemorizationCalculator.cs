using InWords.Data.DTO.Enums;
using InWords.WebApi.Model.UserWordPair;
using InWords.WebApi.Model.UserWordPair.MemorizationLevels;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using System;
using System.Collections.Generic;

namespace InWords.WebApi.Services.UserWordPairService
{
    [Obsolete]
    public class MemorizationCalculator
    {
        private const int DAYS_GRANTING_TIMESPAN = 1;
        private readonly Dictionary<KnowledgeQualities, BaseMemorization> knowledgeGaranter;

        public MemorizationCalculator()
        {
            knowledgeGaranter = new Dictionary<KnowledgeQualities, BaseMemorization>
            {
                {KnowledgeQualities.EasyToRemember, new ExcellentMemorization()},
                {KnowledgeQualities.StillRemember, new SatisfactoryMemorization()},
                {KnowledgeQualities.NoLongerRemember, new UncertainMemorization()}
            };
        }

        public Memorization Update(Memorization knowledgeLicense, KnowledgeQualities knowledgeQuality)
        {
            if (IsEasyButEarlyToRepeat(knowledgeLicense, knowledgeQuality))
                knowledgeQuality = KnowledgeQualities.StillRemember;
            return knowledgeGaranter[knowledgeQuality].Grant(knowledgeLicense);
        }

        private bool IsEasyButEarlyToRepeat(Memorization knowledgeLicense, KnowledgeQualities knowledgeQuality)
        {
            return knowledgeQuality.Equals(KnowledgeQualities.EasyToRemember) && IsNotGrantingTime(knowledgeLicense);
        }

        private bool IsNotGrantingTime(Memorization knowledgeLicense)
        {
            return knowledgeLicense.RepeatTime > DateTime.UtcNow.AddDays(DAYS_GRANTING_TIMESPAN);
        }
    }
}