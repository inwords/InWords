namespace InWords.Auth
{
    using InWords.Auth.Interface;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;

    public static class AuthOptions
    {
        public const string ISSUER = "InWords.Auth"; // издатель токена
        public const string AUDIENCE = "http://localhost"; // потребитель токена http://localhost:5000/
        public const int LIFETIME = 60; // время жизни токена в минутах

        public static readonly IJWTProvider TokenProvider = null;

        static AuthOptions()
        {
            TokenProvider = new SimmetricJWTTokenProvider(
                issuer: ISSUER,
                audience: AUDIENCE,
                minutesLifetime: LIFETIME);
        }
    }
}
