namespace InWords.Auth
{
    using InWords.Auth.Interface;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;

    public static class AuthOptions
    {
        public const string ISSUER = "InWords.Auth"; // издатель токена
        public const string AUDIENCE = "http://localhost"; // потребитель токена http://localhost:5000/
        public const int LIFETIME = 300; // время жизни токена - 1 минута

        public static IJWTProvider TokenProvider = null;
        
        static AuthOptions()
        {
            TokenProvider = new SimmetricJWTTokenProvider();
        }

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes("KEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEY"));
        }

    }
}
