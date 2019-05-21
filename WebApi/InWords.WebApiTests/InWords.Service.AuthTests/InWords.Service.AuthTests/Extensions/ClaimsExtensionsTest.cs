using System;
using System.Collections.Generic;
using System.Security.Claims;
using InWords.Service.Auth.Extensions;
using Xunit;
namespace InWords.Service.AuthTests.Extensions
{
    public class ClaimsExtensionsTest
    {
        [Theory]
        [InlineData(0)]
        [InlineData(5463)]
        [InlineData(int.MinValue)]
        [InlineData(int.MaxValue)]
        public void GetUserIdOnExistNumber(int id)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, $"{id}")

            };
            int resultId = claims.GetUserId();
            Assert.Equal(id, resultId);
        }

        [Theory]
        [InlineData("")]
        [InlineData("fake")]
        public void GetUserIdStringId(string fakeId)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, $"{fakeId}")
            };
            Assert.Throws<ArgumentNullException>(() => claims.GetUserId());
        }

        [Fact]
        public void GetUserIdOnNotExist()
        {
            Assert.Throws<ArgumentNullException>(() => new List<Claim>().GetUserId());
        }
    }
}
