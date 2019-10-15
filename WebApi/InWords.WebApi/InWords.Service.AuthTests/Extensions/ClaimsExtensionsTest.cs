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
        [InlineData(5463)]
        public void GetUserIdOnExistNotSingle(int id)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, $"{id}"),
                new Claim(ClaimTypes.NameIdentifier, $"{id}")
            };
            Assert.Throws<InvalidOperationException>(() => claims.GetUserId());
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

        [Fact]
        public void GetUserIdOnClaimsPrincipalNull()
        {
            ClaimsPrincipal user = null;
            Assert.Throws<NullReferenceException>(() => user.GetUserId());
        }

        [Theory]
        [InlineData("Admin")]
        [InlineData("User")]
        [InlineData("Strange019283ButDon'tCareInThisPackage")]
        public void GetUserRoleOnExistRole(string role)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Role, $"{role}")

            };
            string resultRole = claims.GetUserRole();
            Assert.Equal(role, resultRole);
        }

        [Theory]
        [InlineData("User")]
        public void GetUserRoleOnExistNotSingleRole(string role)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Role, $"{role}"),
                new Claim(ClaimTypes.Role, $"{role}")
            };
            Assert.Throws<InvalidOperationException>(() => claims.GetUserRole());
        }

        [Fact]
        public void GetUserRoleOnClaimsPrincipalNull()
        {
            ClaimsPrincipal user = null;
            Assert.Throws<NullReferenceException>(() => user.GetUserRole());
        }

        [Fact]
        public void GetUserRoleOnNotExist()
        {
            Assert.Throws<ArgumentNullException>(() => new List<Claim>().GetUserRole());
        }
    }
}
