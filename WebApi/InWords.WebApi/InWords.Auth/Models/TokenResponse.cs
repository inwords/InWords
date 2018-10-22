using InWords.Auth.Interface;
using InWords.Transfer.Data;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace InWords.Auth
{
    public class TokenResponse : ResultException
    {
        public string Access_token { get; private set; }

        public string Email { get; private set; }

        public TokenResponse(ClaimsIdentity identity)
        {
            // получение токена
            var encodedJwt = AuthOptions.TokenProvider.GenerateToken(identity);

            Access_token = Cheked(encodedJwt, out string errMsg);
            Email = identity.Name;
            ErrorMsg = errMsg;

            // подготовка ответа
            // для тестирования // todo
        }

        public TokenResponse(string errorMsg, ClaimsIdentity identity = null)
        {
            Access_token = "";
            Email = identity?.Name;
            ErrorMsg = errorMsg;
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
