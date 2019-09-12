using InWords.WebApi.Services.UserWordPairService.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Models.LicenseProviders
{
    public class ExcellentKnowledge : KnowledgeLicenseProvider
    {
        public override KnowledgeLicense Grant(KnowledgeLicense knowledgeLicense)
        {
            knowledgeLicense.Period += 1;
            return knowledgeLicense;
        }
    }
}
