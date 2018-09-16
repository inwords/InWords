using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace InWords.Auth.Interface
{
    public interface IJWTProvider
    {
        string GenerateToken(ClaimsIdentity identity);

        void ValidateOptions(JwtBearerOptions options);
    }
}
