using System;
using System.Linq;
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
            string encodedJwt = AuthOptions.TokenProvider.GenerateToken(identity);
            Token = Cheeked(encodedJwt, out string errMsg);
            UserId = identity.Claims.GetUserId();
        }

        private static string Cheeked(string encodedJwt, out string errorMsg)
        {
            errorMsg = "";
            if (encodedJwt == null) errorMsg = "Token fail";
            return encodedJwt;
        }
    }
}