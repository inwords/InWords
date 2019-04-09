using System.Security.Claims;
using InWords.Auth.Extensions;

namespace InWords.Auth.Models
{
    public class TokenResponse
    {
        public string Token { get; }

        public int UserId { get; }

        public TokenResponse(ClaimsIdentity identity)
        {
            Token = AuthOptions.TokenProvider.GenerateToken(identity);
            UserId = identity.Claims.GetUserId();
        }
    }
}