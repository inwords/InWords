using System.Collections.Generic;
using System.Security.Claims;
using InWords.Service.Auth.Extensions;

namespace InWords.Service.Auth.Models
{
    public class TokenResponse
    {
        public int UserId { get; private set; }
        public string Token { get; private set; }

        public TokenResponse(int userId, object role)
        {
            IEnumerable<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, $"{userId}"),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, $"{role}")
            };

            var claimsIdentity = new ClaimsIdentity(claims);

            Token = AuthOptions.TokenProvider.GenerateToken(claimsIdentity);
            UserId = claimsIdentity.Claims.GetUserId();
        }
    }
}