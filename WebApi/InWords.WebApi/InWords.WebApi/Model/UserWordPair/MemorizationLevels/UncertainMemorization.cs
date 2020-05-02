using System;

namespace InWords.WebApi.Model.UserWordPair.MemorizationLevels
{
    public class UncertainMemorization : BaseMemorization
    {
        public override Memorization Grant(Memorization knowledgeLicense)
        {
            knowledgeLicense.Period = Convert.ToInt16(Math.Truncate(0.2 * knowledgeLicense.Period));
            return base.Grant(knowledgeLicense);
        }
    }
}