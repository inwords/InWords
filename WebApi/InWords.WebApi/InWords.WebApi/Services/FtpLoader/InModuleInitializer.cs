using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.FtpLoader.Model;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.Services.FtpLoader
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<FileLoader>().InstancePerLifetimeScope();
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.Configure<FtpCredentials>(Configuration.GetSection(nameof(FtpCredentials)));
        }
    }
}