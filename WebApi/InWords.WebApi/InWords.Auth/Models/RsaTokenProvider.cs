﻿namespace InWords.Auth
{
    using System;
    using System.IO;
    using System.Security.Claims;
    using InWords.Auth.Interface;
    using System.Security.Cryptography;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using NETCore.Encrypt.Extensions.Internal;

    public class RsaTokenProvider : ITokenProvider
    {
        private static readonly string SecretfilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "key.security");

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
                issuer: "localhost:53636",
                audience: "localhost:53636",
                expires: DateTime.Now.AddDays(10),
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
            rsaParam.FromJsonString(key);

            return new RsaSecurityKey(rsaParam);
        }

        private string CreateKey()
        {
            string key = null;
            try
            {
                using (var rsa = RSA.Create())
                {
                    key = rsa.ToJsonString(true);
                }
            }
            catch (Exception e)
            {
                string msg = e.Message;
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
