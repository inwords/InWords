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
            return knowledgeGaranter[knowledgeQuality].Grant(knowledgeLicense);
        }
    }
}
