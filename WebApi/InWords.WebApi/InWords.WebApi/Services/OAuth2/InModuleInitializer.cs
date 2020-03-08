using Autofac;
using InWords.Service.Auth;
using InWords.WebApi.Module;
using InWords.WebApi.Services.OAuth2.JwtProviders;
using InWords.WebApi.Services.OAuth2.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.Services.OAuth2
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            JwtSettings jwtSettings = Configuration.GetSection("JwtSettings").Get<JwtSettings>();
            builder.RegisterInstance(new SymmetricJwtTokenProvider(jwtSettings)).AsImplementedInterfaces();
        }
    }
}
