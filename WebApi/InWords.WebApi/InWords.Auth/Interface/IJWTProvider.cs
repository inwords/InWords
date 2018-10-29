namespace InWords.Auth.Interface
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using System.Security.Claims;

    public interface IJWTProvider
    {
        string GenerateToken(ClaimsIdentity identity);

        void ValidateOptions(JwtBearerOptions options);
    }
}
