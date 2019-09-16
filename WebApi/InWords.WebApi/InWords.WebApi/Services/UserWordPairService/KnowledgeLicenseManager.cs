using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;
using InWords.WebApi.Services.UserWordPairService.Models;
using InWords.WebApi.Services.UserWordPairService.Models.LicenseProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService
{
    public class KnowledgeLicenseManager
    {
        private const int DAYS_GRANTING_TIMESPAN = 1;
        private readonly Dictionary<KnowledgeQualitys, KnowledgeLicenseProvider> knowledgeGaranter;

        public KnowledgeLicenseManager()
        {
            knowledgeGaranter = new Dictionary<KnowledgeQualitys, KnowledgeLicenseProvider>
            {
                { KnowledgeQualitys.EasyToRemember, new ExcellentKnowledge() },
                { KnowledgeQualitys.StillRemember, new SatisfactoryKnowledge() },
                { KnowledgeQualitys.NoLongerRemember, new UncertainKnowledge() }
            };
        }

        public KnowledgeLicense Update(KnowledgeLicense knowledgeLicense, KnowledgeQualitys knowledgeQuality)
        {
            if (IsEasyButEarlyToRepeat(knowledgeLicense, knowledgeQuality))
            {
                knowledgeQuality = KnowledgeQualitys.StillRemember;
            }
            return knowledgeGaranter[knowledgeQuality].Grant(knowledgeLicense);

        }

        private bool IsEasyButEarlyToRepeat(KnowledgeLicense knowledgeLicense, KnowledgeQualitys knowledgeQuality)
        {
            return knowledgeQuality.Equals(KnowledgeQualitys.EasyToRemember) && IsGrantingTime(knowledgeLicense);
        }

        private bool IsGrantingTime(KnowledgeLicense knowledgeLicense)
        {
            return (knowledgeLicense.RepeatTime - DateTime.UtcNow).TotalDays < DAYS_GRANTING_TIMESPAN;
        }
    }
}
