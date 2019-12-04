using System;
using System.Collections.Generic;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;
using InWords.WebApi.Services.UserWordPairService.Models;
using InWords.WebApi.Services.UserWordPairService.Models.LicenseProviders;

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

        public KnowledgeLicense Update(KnowledgeLicense knowledgeLicense, KnowledgeQualitys knowledgeQuality)
        {
            if (IsEasyButEarlyToRepeat(knowledgeLicense, knowledgeQuality))
                knowledgeQuality = KnowledgeQualitys.StillRemember;
            return knowledgeGaranter[knowledgeQuality].Grant(knowledgeLicense);
        }

        private bool IsEasyButEarlyToRepeat(KnowledgeLicense knowledgeLicense, KnowledgeQualitys knowledgeQuality)
        {
            return knowledgeQuality.Equals(KnowledgeQualitys.EasyToRemember) && IsNotGrantingTime(knowledgeLicense);
        }

        private bool IsNotGrantingTime(KnowledgeLicense knowledgeLicense)
        {
            return knowledgeLicense.RepeatTime > DateTime.UtcNow.AddDays(DAYS_GRANTING_TIMESPAN);
        }
    }
}