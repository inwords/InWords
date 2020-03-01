using InWords.Service.Auth.Interfaces;
using InWords.Service.Auth.Models;

namespace InWords.Service.Auth
{
    public static class AuthOptions
    {
        public const string ISSUER = "InWords.Auth"; // token publisher
        public const string AUDIENCE = "http://localhost:80/"; // the consumer token http://localhost:5000/
        public const int LIFETIME = 10080; // the token lifetime, in minutes

        public static readonly IJwtProvider TokenProvider;

        static AuthOptions()
        {
            TokenProvider = new SymmetricJwtTokenProvider(
                ISSUER,
                AUDIENCE,
                LIFETIME);
        }
    }
}