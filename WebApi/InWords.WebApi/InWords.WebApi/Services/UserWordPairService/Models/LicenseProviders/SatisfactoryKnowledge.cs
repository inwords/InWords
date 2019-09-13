using InWords.WebApi.Services.UserWordPairService.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Models.LicenseProviders
{
    public class SatisfactoryKnowledge : KnowledgeLicenseProvider
    {
        public override KnowledgeLicense Grant(KnowledgeLicense knowledgeLicense)
        {
            return base.Grant(knowledgeLicense);
        }
    }
}
