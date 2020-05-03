﻿namespace InWords.WebApi.Model.UserWordPair.MemorizationLevels
{
    public class ExcellentMemorization : BaseMemorization
    {
        public override Memorization Grant(Memorization knowledgeLicense)
        {
            knowledgeLicense.Period += 1;
            return base.Grant(knowledgeLicense);
        }
    }
}