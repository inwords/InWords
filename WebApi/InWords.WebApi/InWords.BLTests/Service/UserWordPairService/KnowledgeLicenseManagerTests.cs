using InWords.WebApi.Services.UserWordPairService;
using InWords.WebApi.Services.UserWordPairService.Enum;
using InWords.WebApi.Services.UserWordPairService.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace InWords.BLTests.Service.UserWordPairService
{
    public class KnowledgeLicenseManagerTests
    {
        [Fact]
        public void UpdateEasyToRememberWordsLicense()
        {
            // prep
            KnowledgeLicenseManager licenseManager = new KnowledgeLicenseManager();
            KnowledgeLicense knowledgeLicense = new KnowledgeLicense();
            KnowledgeQualitys knowledgeQuality = KnowledgeQualitys.EasyToRemember;
            int expectedPeriod = 1;
            // act
            KnowledgeLicense UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            bool expectedTimeLarger = UpdatedKnowledgeLicense.RepeatTime> DateTime.UtcNow;
            // assert
            Assert.Equal(UpdatedKnowledgeLicense.Period, knowledgeLicense.Period);
            Assert.Equal(UpdatedKnowledgeLicense.RepeatTime, knowledgeLicense.RepeatTime);
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
            Assert.True(expectedTimeLarger);
        }
    }
}
