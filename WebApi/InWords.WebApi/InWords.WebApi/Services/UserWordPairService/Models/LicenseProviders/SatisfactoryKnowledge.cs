﻿using InWords.WebApi.Services.UserWordPairService.Abstraction;

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