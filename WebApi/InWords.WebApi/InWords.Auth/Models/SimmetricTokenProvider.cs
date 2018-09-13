namespace InWords.Auth
{
    using InWords.Auth.Interface;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text;

    public class SimmetricTokenProvider : ITokenProvider
    {
        private static readonly string SecretfilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "key.security");

        private readonly SecurityFileProvider securefileProvider = null;

        public SimmetricTokenProvider()
        {
            securefileProvider = new SecurityFileProvider(SecretfilePath);
        }

        public string GenerateToken()
        {
            //var signingCred = new SigningCredentials(rsaKey, SecurityAlgorithms.RsaSha256Signature);

            //var userClaim = new[]
            //{
            //    new Claim(ClaimTypes.UserData,"id1"),
            //    new Claim(ClaimTypes.Email,"email@vasya.cool")
            //};


            //var token = new JwtSecurityToken(
            //    issuer: "localhost:53636",
            //    audience: "localhost:53636",
            //    expires: DateTime.Now.AddDays(10),
            //    claims: userClaim,
            //    signingCredentials: signingCred
            //    );


            //string tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            //return tokenString;
            return null;
        }

        public bool ValidateToken(string tokenString)
        {
            throw new NotImplementedException();
        }
    }
}
