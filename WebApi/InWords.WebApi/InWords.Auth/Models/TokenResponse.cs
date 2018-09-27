using InWords.Auth.Interface;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace InWords.Auth
{
    public class TokenResponse
    {
        public string Access_token { get; private set; }

        public string Email { get; private set; }

        public TokenResponse(ClaimsIdentity identity)
        {
            // получение токена
            var encodedJwt = AuthOptions.TokenProvider.GenerateToken(identity);

            // подготовка ответа
            Access_token = encodedJwt;
            Email = identity.Name; 
            // для тестирования // todo
        }
    }
}
