using InWords.Auth.Interfaces;
using InWords.Auth.Models;

namespace InWords.Auth
{
    using InWords.Auth.Interfaces;

    public static class AuthOptions
    {
        public const string ISSUER = "InWords.Auth"; // token publisher
        public const string AUDIENCE = "http://localhost:80/"; // the consumer token http://localhost:5000/
        public const int LIFETIME = 60; // the token lifetime, in minutes

        public static readonly IJwtProvider TokenProvider = null;

        static AuthOptions()
        {
            TokenProvider = new SymmetricJwtTokenProvider(
                issuer: ISSUER,
                audience: AUDIENCE,
                minutesLifetime: LIFETIME);
        }
    }
}
