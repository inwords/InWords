using Autofac;
using Autofac.Extensions.DependencyInjection;
using InWords.Data.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace InWords.WebApi
{
    public class IocConfig
    {
        public static IServiceProvider Configure(IServiceCollection services, IConfiguration Configuration)
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.Populate(services);

            containerBuilder.Register(_ => new InWordsDataContext(Configuration.GetConnectionString("DefaultConnection"))).InstancePerLifetimeScope();

            var container = containerBuilder.Build();
            return new AutofacServiceProvider(container);
        }
    }
}
