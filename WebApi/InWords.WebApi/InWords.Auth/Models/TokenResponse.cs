using System.Linq;
using System.Security.Claims;

namespace InWords.Auth.Models
{
    public class TokenResponse
    {
        public TokenResponse(ClaimsIdentity identity)
        {
            // receive token
            string encodedJwt = AuthOptions.TokenProvider.GenerateToken(identity);

            Access_token = Cheeked(encodedJwt, out string errMsg);
            Email = identity.Claims.First(c => c.Type == ClaimTypes.Email).Value; // GetUserEmail();

            // preparing response
        }

        private static string Cheeked(string encodedJwt, out string errorMsg)
        {
            errorMsg = "";
            if (encodedJwt == null) errorMsg = "Token fail";
            return encodedJwt;
        }

        #region Props

        public string Access_token { get; }

        public string Email { get; }

        #endregion
    }
}