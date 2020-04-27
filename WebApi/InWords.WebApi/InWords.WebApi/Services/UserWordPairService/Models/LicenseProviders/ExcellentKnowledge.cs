using InWords.WebApi.Services.UserWordPairService.Abstraction;

namespace InWords.WebApi.Services.UserWordPairService.Models.LicenseProviders
{
    public class ExcellentKnowledge : KnowledgeLicenseProvider
    {
        public override Memorization Grant(Memorization knowledgeLicense)
        {
            knowledgeLicense.Period += 1;
            return base.Grant(knowledgeLicense);
        }
    }
}