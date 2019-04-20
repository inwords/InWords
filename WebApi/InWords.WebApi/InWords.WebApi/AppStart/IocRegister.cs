using Autofac;
using Autofac.Extensions.DependencyInjection;
using InWords.Data.Models;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using InWords.Data;

namespace InWords.WebApi.AppStart
{
    public static class IocConfig
    {
        public static IServiceProvider Configure(this IServiceCollection services, IConfiguration Configuration)
        {
            var builder = new ContainerBuilder();
            builder.Populate(services);

            // register context
            builder.Register(_ => new InWordsDataContext(Configuration.GetConnectionString("DefaultConnection"))).InstancePerLifetimeScope();


            //register repositories
            var repositoryAssembly = Assembly.GetAssembly(typeof(InWordsDataContext));
            builder.RegisterAssemblyTypes(repositoryAssembly)
                .Where(a => a.Name.EndsWith("Repository") && a.Name.StartsWith("InWords.Data")).InstancePerLifetimeScope();

            //register services
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .Where(a => a.Name.EndsWith("Service") && a.Name.StartsWith("InWords.WebApi.Services")).InstancePerLifetimeScope();

            var container = builder.Build();
            return new AutofacServiceProvider(container);
        }
    }
}
