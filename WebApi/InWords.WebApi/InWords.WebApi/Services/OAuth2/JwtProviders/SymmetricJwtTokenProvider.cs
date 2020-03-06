using InWords.Service.Auth.Interfaces;
using InWords.WebApi.Services.OAuth2.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.OAuth2.JwtProviders
{
    public class SymmetricJwtTokenProvider : IJwtProvider
    {
        private readonly JwtSettings jwtSettings;
        public SymmetricJwtTokenProvider(JwtSettings jwtSettings)
        {
            this.jwtSettings = jwtSettings;
        }
        public string GenerateToken(ClaimsIdentity identity)
        {
            DateTime now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                //Issuer,
                //Audience,
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
            return new SymmetricSecurityKey(GetSecret());
        }
        private SigningCredentials GetSigningCredentials()
        {
            return new SigningCredentials(GetIssuerSigningKey(), SecurityAlgorithms.HmacSha256Signature);
        }
    }
}