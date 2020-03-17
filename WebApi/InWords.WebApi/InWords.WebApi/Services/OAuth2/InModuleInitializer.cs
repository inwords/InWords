using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.OAuth2.JwtProviders;
using InWords.WebApi.Services.OAuth2.Models;
using InWords.WebApi.Services.OAuth2.Requests;
using Microsoft.Extensions.Configuration;

namespace InWords.WebApi.Services.OAuth2
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            JwtSettings jwtSettings = Configuration.GetSection("JwtSettings").Get<JwtSettings>();
            builder.RegisterInstance(new SymmetricJwtTokenProvider(jwtSettings)).AsImplementedInterfaces();
            builder.RegisterType<GoogleAuth>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
