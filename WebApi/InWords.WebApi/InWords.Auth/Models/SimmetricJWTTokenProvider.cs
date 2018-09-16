namespace InWords.Auth
{
    using InWords.Auth.Interface;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.IO;
    using System.Security.Claims;
    using System.Text;

    public class SimmetricJWTTokenProvider : IJWTProvider
    {
        public readonly string Issuer = null;
        public readonly string Audience = null;
        public readonly int MinutesLifetime = 0;

        private static readonly string SecretfilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "key.security");

        private readonly SecurityFileProvider securefileProvider = null;

        public SimmetricJWTTokenProvider(string issuer = "issuerServer",string audience = "http://audienc.e",int minutesLifetime = 9)
        {
            Issuer = issuer;
            Audience = audience;
            MinutesLifetime = minutesLifetime;
            securefileProvider = new SecurityFileProvider(SecretfilePath);
        }

        public string GenerateToken(ClaimsIdentity identity)
        {
            var now = DateTime.UtcNow;
            // создаем JWT-токен
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
            options.RequireHttpsMetadata = false; //SSL при отправке токена не используется
            options.TokenValidationParameters = new TokenValidationParameters
            {
                // укзывает, будет ли валидироваться издатель при валидации токена
                ValidateIssuer = true,
                // строка, представляющая издателя
                ValidIssuer = Issuer,

                // будет ли валидироваться потребитель токена
                ValidateAudience = true,
                // установка потребителя токена
                ValidAudience = Audience,
                // будет ли валидироваться время существования
                ValidateLifetime = true,

                // установка ключа безопасности
                IssuerSigningKey = securefileProvider.GetSymmetricSecurityKey(),
                // валидация ключа безопасности
                ValidateIssuerSigningKey = true,
            };
        }
    }
}
