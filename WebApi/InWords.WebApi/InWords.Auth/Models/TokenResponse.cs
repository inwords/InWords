using System.Collections.Generic;
using System.Security.Claims;
using InWords.Auth.Extensions;

namespace InWords.Auth.Models
{
    public class TokenResponse
    {
        public string Token { get; private set; }

        public int UserId { get; private set; }

        public TokenResponse(ClaimsIdentity identity)
        {
            ClaimsIdentityInit(identity);
        }

        public TokenResponse(object userId, object role)
        {
            ClaimsIdentityInit(userId.ToString(), role.ToString());
        }

        private void ClaimsIdentityInit(ClaimsIdentity identity)
        {
            Token = AuthOptions.TokenProvider.GenerateToken(identity);
            UserId = identity.Claims.GetUserId();
        }

        private void ClaimsIdentityInit(string userId, string role)
        {
            IEnumerable<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, role)
            };

            var claimsIdentity = new ClaimsIdentity(claims);
            ClaimsIdentityInit(claimsIdentity);
        }
    }
}