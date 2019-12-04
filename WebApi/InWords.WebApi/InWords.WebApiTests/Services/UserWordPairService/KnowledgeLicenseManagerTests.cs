using System;
using InWords.WebApi.Services.UserWordPairService.Enum;
using InWords.WebApi.Services.UserWordPairService.Models;
using Xunit;
using KnowledgeLicenseCalculator = InWords.WebApi.Services.UserWordPairService.KnowledgeLicenseCalculator;

namespace InWords.WebApiTests.Services.UserWordPairService
{
    public class KnowledgeLicenseManagerTests
    {
        [Fact]
        public void EasyToRememberBehavior()
        {
            // prep
            var licenseManager = new KnowledgeLicenseCalculator();
            var knowledgeLicense = new KnowledgeLicense();
            var knowledgeQuality = KnowledgeQualitys.EasyToRemember;
            var expectedPeriod = 1;
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
            var licenseManager = new KnowledgeLicenseCalculator();
            var knowledgeLicense = new KnowledgeLicense
            {
                Period = 0,
                RepeatTime = DateTime.MaxValue
            };
            var knowledgeQuality = KnowledgeQualitys.EasyToRemember;
            var expectedPeriod = 0;
            // act
            KnowledgeLicense UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }

        [Fact]
        public void NoLongerRememberBehavior()
        {
            // prep
            var licenseManager = new KnowledgeLicenseCalculator();
            var knowledgeLicense = new KnowledgeLicense
            {
                Period = 1,
                RepeatTime = DateTime.Now
            };
            var knowledgeQuality = KnowledgeQualitys.NoLongerRemember;
            var expectedPeriod = 0;
            // act
            KnowledgeLicense UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }

        [Fact]
        public void StillRememberBehavior()
        {
            // prep
            var licenseManager = new KnowledgeLicenseCalculator();
            var knowledgeLicense = new KnowledgeLicense
            {
                Period = 1,
                RepeatTime = DateTime.Now
            };
            var knowledgeQuality = KnowledgeQualitys.StillRemember;
            var expectedPeriod = 1;
            // act
            KnowledgeLicense UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }
    }
}