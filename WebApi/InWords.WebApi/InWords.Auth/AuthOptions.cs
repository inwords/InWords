namespace InWords.Auth
{
    using Microsoft.IdentityModel.Tokens;
    using System.Text;

    public class AuthOptions
    {
        public const string ISSUER = "InWords.Auth"; // издатель токена
        public const string AUDIENCE = "http://localhost"; // потребитель токена http://localhost:5000/
        public const int LIFETIME = 1; // время жизни токена - 1 минута

        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации переместить в security
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
