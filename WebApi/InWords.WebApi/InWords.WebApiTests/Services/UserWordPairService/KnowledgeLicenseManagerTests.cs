using InWords.Data.DTO.Enums;
using InWords.WebApi.Model.UserWordPair;
using System;
using Xunit;
using MemorizationCalculator = InWords.WebApi.Services.UserWordPairService.MemorizationCalculator;

namespace InWords.WebApiTests.Services.UserWordPairService
{
    public class KnowledgeLicenseManagerTests
    {
        [Fact]
        public void EasyToRememberBehavior()
        {
            // prep
            var licenseManager = new MemorizationCalculator();
            var knowledgeLicense = new Memorization();
            var knowledgeQuality = KnowledgeQualities.EasyToRemember;
            var expectedPeriod = 1;
            // act
            Memorization UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            bool expectedTimeLarger = UpdatedKnowledgeLicense.RepeatTime > DateTime.UtcNow;
            // assert
            Assert.NotEqual(UpdatedKnowledgeLicense.RepeatTime, knowledgeLicense.RepeatTime);
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
            Assert.True(expectedTimeLarger);
        }

        [Fact]
        public void EasyToRememberButEarlyRepeatGranting()
        {
            // prep
            var licenseManager = new MemorizationCalculator();
            var knowledgeLicense = new Memorization
            {
                Period = 0,
                RepeatTime = DateTime.MaxValue
            };
            var knowledgeQuality = KnowledgeQualities.EasyToRemember;
            var expectedPeriod = 0;
            // act
            Memorization UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }

        [Fact]
        public void NoLongerRememberBehavior()
        {
            // prep
            var licenseManager = new MemorizationCalculator();
            var knowledgeLicense = new Memorization
            {
                Period = 1,
                RepeatTime = DateTime.Now
            };
            var knowledgeQuality = KnowledgeQualities.NoLongerRemember;
            var expectedPeriod = 0;
            // act
            Memorization UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }

        [Fact]
        public void StillRememberBehavior()
        {
            // prep
            var licenseManager = new MemorizationCalculator();
            var knowledgeLicense = new Memorization
            {
                Period = 1,
                RepeatTime = DateTime.Now
            };
            var knowledgeQuality = KnowledgeQualities.StillRemember;
            var expectedPeriod = 1;
            // act
            Memorization UpdatedKnowledgeLicense = licenseManager.Update(knowledgeLicense, knowledgeQuality);
            // assert
            Assert.Equal(expectedPeriod, UpdatedKnowledgeLicense.Period);
        }
    }
}