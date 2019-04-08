using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;

namespace InWords.Auth.Models
{
    internal class SecurityFileProvider : FileProvider
    {
        private const int DEFAULT_KEY_LENGTH = 256;

        private int KeyLength { get; set; }

        internal string SymmetricSecurityKey { get; private set; }

        internal SecurityFileProvider(string filePath, int keyLength = DEFAULT_KEY_LENGTH) : base(filePath)
        {
            KeyLength = keyLength;
            Initialize();
        }

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