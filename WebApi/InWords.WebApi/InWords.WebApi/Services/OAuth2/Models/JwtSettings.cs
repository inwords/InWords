namespace InWords.WebApi.Services.OAuth2.Models
{
    public class JwtSettings
    {
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public int MinutesLifetime { get; set; }
        public string Secret { get; set; }

        public JwtSettings()
        {
            Audience = string.Empty;
            Issuer = string.Empty;
            Secret = string.Empty;
        }
    }
}
