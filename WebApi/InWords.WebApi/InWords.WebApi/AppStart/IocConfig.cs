using System;
using System.Linq;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Repositories;
using InWords.Data.Repositories.Interfaces;
using InWords.WebApi.Net;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.AppStart
{
    public static class IocConfig
    {
        public static IServiceProvider Configure(this IServiceCollection services, IConfiguration Configuration)
        {
            var builder = new ContainerBuilder();
            builder.Populate(services);

            // register modules types
            Program.InModules.ForEach((m) => m.ConfigureIoc(builder));

            // register services
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .Where(a => a.Name.EndsWith("Service")
                && a.Namespace.StartsWith("InWords.WebApi.Services")
                && !a.Namespace.Contains("Abstractions"))
                .InstancePerLifetimeScope();

            builder.RegisterType<EmailVerifierRepository>().As<IEmailVerifierRepository>();

            // register FTP
            builder.RegisterType<FileLoader>().InstancePerLifetimeScope();
            IContainer container = builder.Build();

            return new AutofacServiceProvider(container);
        }
    }
}