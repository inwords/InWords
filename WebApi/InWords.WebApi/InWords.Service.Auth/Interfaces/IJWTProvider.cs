using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace InWords.Service.Auth.Interfaces
{
    public interface IJwtProvider
    {
        string GenerateToken(ClaimsIdentity identity);

        void ValidateOptions(JwtBearerOptions options);
    }
}