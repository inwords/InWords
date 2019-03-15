using System.Linq;
using System.Security.Claims;

namespace InWords.Auth.Models
{
    public class TokenResponse
    {
        #region Props

        public string Access_token { get; private set; }

        public string Email { get; private set; }

        #endregion


        public TokenResponse(ClaimsIdentity identity)
        {
            // получение токена
            var encodedJwt = AuthOptions.TokenProvider.GenerateToken(identity);

            Access_token = Cheked(encodedJwt, out string errMsg);
            Email = identity.Claims.Where(c => c.Type == ClaimTypes.Email).First().Value; // GetUserEmail();

            // подготовка ответа
            // для тестирования // todo
        }

        private string Cheked(string encodedJwt, out string errorMsg)
        {
            errorMsg = "";
            if (encodedJwt == null)
            {
                errorMsg = "Token fail";
            }
            return encodedJwt;
        }
    }
}
