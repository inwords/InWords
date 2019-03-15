using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using InWords.Auth.Interfaces;
using InWords.Auth.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace InWords.Auth.Models
{
    public class SymmetricJwtTokenProvider : IJwtProvider
    {
        public readonly string Issuer = null;
        public readonly string Audience = null;
        public readonly int MinutesLifetime = 0;

        private static readonly string SecretFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "key.security");

        private readonly SecurityFileProvider securefileProvider = null;

        public SymmetricJwtTokenProvider(string issuer = "issuerServer",string audience = "http://audienc.e",int minutesLifetime = 9)
        {
            Issuer = issuer;
            Audience = audience;
            MinutesLifetime = minutesLifetime;
            securefileProvider = new SecurityFileProvider(SecretFilePath);
        }

        public string GenerateToken(ClaimsIdentity identity)
        {
            DateTime now = DateTime.UtcNow;
            // create a JWT token
            var jwt = new JwtSecurityToken(
                    issuer: Issuer,
                    audience: Audience,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(MinutesLifetime)),
                    signingCredentials: new SigningCredentials(securefileProvider.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public void ValidateOptions(JwtBearerOptions options)
        {
            options.RequireHttpsMetadata = false; //SSL is not used when sending a token
            options.TokenValidationParameters = new TokenValidationParameters
            {
                // specifies whether publisher when validating the token
                ValidateIssuer = true,
                // a string that represents the publisher
                ValidIssuer = Issuer,

                // will validation consumer token
                ValidateAudience = true,
                // set consumer token
                ValidAudience = Audience,
                // will the lifetime be validated
                ValidateLifetime = true,

                // security key installation
                IssuerSigningKey = securefileProvider.GetSymmetricSecurityKey(),
                // validation of the security key
                ValidateIssuerSigningKey = true,
            };
        }
    }
}
