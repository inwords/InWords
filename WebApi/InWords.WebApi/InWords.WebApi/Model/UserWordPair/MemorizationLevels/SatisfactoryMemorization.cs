using InWords.WebApi.Model.UserWordPair;
using InWords.WebApi.Services.UserWordPairService.Abstraction;

namespace InWords.WebApi.Model.UserWordPair.MemorizationLevels
{
    public class SatisfactoryMemorization : BaseMemorization
    {
        public override Memorization Grant(Memorization knowledgeLicense)
        {
            return base.Grant(knowledgeLicense);
        }
    }
}