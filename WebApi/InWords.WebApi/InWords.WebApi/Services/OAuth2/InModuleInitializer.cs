using Autofac;
using InWords.Service.Encryption;
using InWords.WebApi.Module;
using InWords.WebApi.Services.Users.EmailUpdate;
using InWords.WebApi.Services.Users.Registration;
using InWords.WebApi.Services.Users.Token;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.Services.OAuth2
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthorization();
            services.AddGoogle()
        }
    }
}
