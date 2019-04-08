using System;
using System.Linq;
using System.Security.Claims;
using InWords.Auth.Extensions;

namespace InWords.Auth.Models
{
    public class TokenResponse
    {
        public TokenResponse(ClaimsIdentity identity)
        {
            // receive token
            string encodedJwt = AuthOptions.TokenProvider.GenerateToken(identity);



            Token = Cheeked(encodedJwt, out string errMsg);
            UserId = identity.Claims.GetUserId();

            // TODO remove
            Access_token = Token;
            Email = "Method1 is deprecated, please use Method2 instead, pls use UserId instead";
        }

        private static string Cheeked(string encodedJwt, out string errorMsg)
        {
            errorMsg = "";
            if (encodedJwt == null) errorMsg = "Token fail";
            return encodedJwt;
        }

        #region Props

        [Obsolete] // TODO remove depricated
        public string Access_token { get; }
        [Obsolete]
        public string Email { get; }

        public string Token { get; }

        public int UserId { get; }

        #endregion
    }
}