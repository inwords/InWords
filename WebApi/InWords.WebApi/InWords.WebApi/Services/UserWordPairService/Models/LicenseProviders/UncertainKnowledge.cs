using System;
using InWords.WebApi.Services.UserWordPairService.Abstraction;

namespace InWords.WebApi.Services.UserWordPairService.Models.LicenseProviders
{
    public class UncertainKnowledge : KnowledgeLicenseProvider
    {
        public override KnowledgeLicense Grant(KnowledgeLicense knowledgeLicense)
        {
            knowledgeLicense.Period = Convert.ToInt16(Math.Truncate(0.2 * knowledgeLicense.Period));
            return base.Grant(knowledgeLicense);
        }
    }
}