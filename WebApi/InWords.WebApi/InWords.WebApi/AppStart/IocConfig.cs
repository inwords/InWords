using System;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using InWords.Data.Models;
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

            // register context
            builder.Register(_ => new InWordsDataContext(Configuration.GetConnectionString("DefaultConnection")))
                .InstancePerLifetimeScope();


            // register repositories
            Assembly repositoryAssembly = Assembly.GetAssembly(typeof(InWordsDataContext));
            builder.RegisterAssemblyTypes(repositoryAssembly)
                .Where(a => a.Name.EndsWith("Repository") && a.Namespace.StartsWith("InWords.Data"))
                .InstancePerLifetimeScope();

            // register services
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .Where(a => a.Name.EndsWith("Service") && a.Namespace.StartsWith("InWords.WebApi.Services") &&
                            !a.Namespace.Contains("Abstractions")).InstancePerLifetimeScope();

            IContainer container = builder.Build();
            return new AutofacServiceProvider(container);
        }
    }
}