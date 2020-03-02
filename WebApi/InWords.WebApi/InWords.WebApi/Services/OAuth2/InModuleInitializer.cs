using InWords.Service.Auth;
using InWords.WebApi.Module;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.Services.OAuth2
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(AuthOptions.TokenProvider.ValidateOptions)
                .AddGoogle(options =>
                {
                    IConfigurationSection googleAuthNSection =
                        Configuration.GetSection("AuthenticationGoogle");

                    options.ClientId = googleAuthNSection["ClientId"];
                    options.ClientSecret = googleAuthNSection["ClientSecret"];
                });
        }
    }
}
