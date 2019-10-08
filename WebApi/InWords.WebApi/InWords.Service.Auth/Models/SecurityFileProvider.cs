using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;

namespace InWords.Service.Auth.Models
{
    internal class SecurityFileProvider : FileProvider
    {
        private const int DEFAULT_KEY_LENGTH = 256;

        internal SecurityFileProvider(string filePath, int keyLength = DEFAULT_KEY_LENGTH) : base(filePath)
        {
            KeyLength = keyLength;
            Initialize();
        }

        private int KeyLength { get; }

        internal string SymmetricSecurityKey { get; private set; }

        private string CreateSecret()
        {
            var key = new byte[KeyLength];
            RandomNumberGenerator.Create().GetBytes(key);
            return Base64UrlTextEncoder.Encode(key);
        }

        private void Initialize()
        {
            SymmetricSecurityKey = Open();
        }

        internal SecurityKey GetSymmetricSecurityKey()
        {
            if (string.IsNullOrEmpty(SymmetricSecurityKey))
            {
                SymmetricSecurityKey = CreateSecret();
                Save(SymmetricSecurityKey);
            }

            byte[] bytes = Encoding.ASCII.GetBytes(SymmetricSecurityKey);

            return new SymmetricSecurityKey(bytes);
        }
    }
}