using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;
using InWords.WebApi.Services.UserWordPairService.Models;
using InWords.WebApi.Services.UserWordPairService.Models.LicenseProviders;
using System;
using System.Collections.Generic;

namespace InWords.WebApi.Services.UserWordPairService
{
    [Obsolete]
    public class KnowledgeLicenseCalculator
    {
        private const int DAYS_GRANTING_TIMESPAN = 1;
        private readonly Dictionary<KnowledgeQualitys, KnowledgeLicenseProvider> knowledgeGaranter;

        public KnowledgeLicenseCalculator()
        {
            knowledgeGaranter = new Dictionary<KnowledgeQualitys, KnowledgeLicenseProvider>
            {
                {KnowledgeQualitys.EasyToRemember, new ExcellentKnowledge()},
                {KnowledgeQualitys.StillRemember, new SatisfactoryKnowledge()},
                {KnowledgeQualitys.NoLongerRemember, new UncertainKnowledge()}
            };
        }

        public Memorization Update(Memorization knowledgeLicense, KnowledgeQualitys knowledgeQuality)
        {
            if (IsEasyButEarlyToRepeat(knowledgeLicense, knowledgeQuality))
                knowledgeQuality = KnowledgeQualitys.StillRemember;
            return knowledgeGaranter[knowledgeQuality].Grant(knowledgeLicense);
        }

        private bool IsEasyButEarlyToRepeat(Memorization knowledgeLicense, KnowledgeQualitys knowledgeQuality)
        {
            return knowledgeQuality.Equals(KnowledgeQualitys.EasyToRemember) && IsNotGrantingTime(knowledgeLicense);
        }

        private bool IsNotGrantingTime(Memorization knowledgeLicense)
        {
            return knowledgeLicense.RepeatTime > DateTime.UtcNow.AddDays(DAYS_GRANTING_TIMESPAN);
        }
    }
}