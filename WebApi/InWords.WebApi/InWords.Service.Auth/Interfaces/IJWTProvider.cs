using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace InWords.Service.Auth.Interfaces
{
    public interface IJwtProvider
    {
        string GenerateToken(ClaimsIdentity identity);

        void ValidateOptions(JwtBearerOptions options);
    }
}