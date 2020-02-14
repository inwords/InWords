using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using InWords.Common.Extensions;
using InWords.Data.Repositories;
using InWords.Data.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.AppStart
{
    public static class IocConfig
    {
        // IConfiguration Configuration
        public static void Configure(this IServiceCollection services)
        {
            var builder = new ContainerBuilder();
            builder.Populate(services);

            // to register types of modules
            Program.InModules.ForEach(m => m.ConfigureIoc(builder));

#warning obsoleted
            // register services
            // TODO: remove
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .Where(a => a.Name.EndsWith("Service")
                            && a.Namespace.StartsWith("InWords.WebApi.Services")
                            && !a.Namespace.Contains("Abstractions"))
                .InstancePerLifetimeScope();

            builder.RegisterType<EmailVerifierRepository>().As<IEmailVerifierRepository>();
            // end warning
        }
    }
}