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
        public void EasyToRememberBehavior()
        {
            // prep
            KnowledgeLicenseManager licenseManager = new KnowledgeLicenseManager();
            KnowledgeLicense knowledgeLicense = new KnowledgeLicense();
            KnowledgeQualitys knowledgeQuality = KnowledgeQualitys.EasyToRemember;
            int expectedPeriod = 1;
            // act
            KnowledgeLicense UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            bool expectedTimeLarger = UpdatedKnowledgeLicense.RepeatTime > DateTime.UtcNow;
            // assert
            Assert.Equal(UpdatedKnowledgeLicense.Period, knowledgeLicense.Period);
            Assert.Equal(UpdatedKnowledgeLicense.RepeatTime, knowledgeLicense.RepeatTime);
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
            Assert.True(expectedTimeLarger);
        }

        [Fact]
        public void EasyToRememberButEarlyRepeatGranting()
        {
            // prep
            KnowledgeLicenseManager licenseManager = new KnowledgeLicenseManager();
            KnowledgeLicense knowledgeLicense = new KnowledgeLicense()
            {
                Period = 0,
                RepeatTime = DateTime.MaxValue
            };
            KnowledgeQualitys knowledgeQuality = KnowledgeQualitys.EasyToRemember;
            int expectedPeriod = 0;
            // act
            KnowledgeLicense UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }

        [Fact]
        public void StillRememberBehavior()
        {
            // prep
            KnowledgeLicenseManager licenseManager = new KnowledgeLicenseManager();
            KnowledgeLicense knowledgeLicense = new KnowledgeLicense()
            {
                Period = 1,
                RepeatTime = DateTime.Now
            };
            KnowledgeQualitys knowledgeQuality = KnowledgeQualitys.StillRemember;
            int expectedPeriod = 1;
            // act
            KnowledgeLicense UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }

        [Fact]
        public void NoLongerRememberBehavior()
        {
            // prep
            KnowledgeLicenseManager licenseManager = new KnowledgeLicenseManager();
            KnowledgeLicense knowledgeLicense = new KnowledgeLicense()
            {
                Period = 1,
                RepeatTime = DateTime.Now
            };
            KnowledgeQualitys knowledgeQuality = KnowledgeQualitys.NoLongerRemember;
            int expectedPeriod = 0;
            // act
            KnowledgeLicense UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }
    }
}
