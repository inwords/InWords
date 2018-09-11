namespace InWords.Auth
{
    using System;
    using System.Security.Claims;
    using InWords.Auth.Interface;
    using System.Collections.Generic;
    using System.Text;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.IdentityModel.Tokens;
    using System.Security.Cryptography;

    public class RsaTokenProvider : ITokenProvider
    {
        private static readonly string SecretfilePath = "key.security";

        private readonly SecurityFileProvider securefileProvider = null;

        public RsaTokenProvider()
        {
            securefileProvider = new SecurityFileProvider(SecretfilePath);
        }

        public string GenerateToken()
        {
            RsaSecurityKey rsaKey = GenerateKey();


            var signingCred = new SigningCredentials(rsaKey, SecurityAlgorithms.RsaSha256Signature);


            var userClaim = new[]
            {
                new Claim(ClaimTypes.UserData,"id1"),
                new Claim(ClaimTypes.Email,"email@vasya.cool")
            };


            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(1),
                claims: userClaim,
                signingCredentials: signingCred
                );


            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }

        private RsaSecurityKey GenerateKey()
        {
            string key = securefileProvider.ReadKeyFromFile();
            if (string.IsNullOrEmpty(key))
            {
                key = CreateKey();
            }

            var rsaParam = new RSACryptoServiceProvider();
            rsaParam.FromXmlString(key);

            return new RsaSecurityKey(rsaParam);
        }

        private string CreateKey()
        {
            string key = null;
            try
            {
                using (var rsa = RSA.Create(256))
                {
                    key = rsa.ToXmlString(true);
                }
            }
            catch (Exception)
            {
                //todo log
            }
            securefileProvider.WriteKeyInFIle(key);
            return key;
        }

        public bool ValidateToken(string tokenString)
        {
            throw new NotImplementedException();
        }
    }
}
