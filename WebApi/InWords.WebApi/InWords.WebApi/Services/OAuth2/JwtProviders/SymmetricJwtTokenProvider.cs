using InWords.Service.Auth.Interfaces;
using InWords.WebApi.Services.OAuth2.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InWords.WebApi.Services.OAuth2.JwtProviders
{
    public class SymmetricJwtTokenProvider : IJwtProvider
    {
        private static SigningCredentials credentials;
        private static SymmetricSecurityKey key;
        private readonly JwtSettings jwtSettings;
        public SymmetricJwtTokenProvider(JwtSettings jwtSettings)
        {
            this.jwtSettings = jwtSettings;
        }
        public string GenerateToken(ClaimsIdentity identity)
        {
            DateTime now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                jwtSettings.Issuer,
                jwtSettings.Audience,
                claims: identity.Claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(jwtSettings.MinutesLifetime)),
                signingCredentials: GetSigningCredentials());

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public void ValidateOptions(JwtBearerOptions options)
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                IssuerSigningKey = GetIssuerSigningKey()
            };
        }

        private byte[] GetSecret()
        {
            return Encoding.UTF8.GetBytes(jwtSettings.Secret);
        }
        private SymmetricSecurityKey GetIssuerSigningKey()
        {
            key = new SymmetricSecurityKey(GetSecret());
            return key;
        }
        private SigningCredentials GetSigningCredentials()
        {
            credentials = new SigningCredentials(GetIssuerSigningKey(), SecurityAlgorithms.HmacSha256Signature);
            return credentials;
        }
    }
}