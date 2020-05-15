using System;

namespace InWords.WebApi.Model.UserWordPair.MemorizationLevels
{
    public class UncertainMemorization : BaseMemorization
    {
        public override Memorization Grant(Memorization currentMemorization, double complexity)
        {
            currentMemorization.Period = Convert.ToInt16(Math.Truncate(0.2 * currentMemorization.Period));
            return base.Grant(currentMemorization, complexity);
        }
    }
}