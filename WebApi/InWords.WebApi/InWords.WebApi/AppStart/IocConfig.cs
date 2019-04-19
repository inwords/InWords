using Autofac;
using Autofac.Extensions.DependencyInjection;
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
        public static IServiceProvider Configure(IServiceCollection services)
        {
            var containerBuilder = new ContainerBuilder();
            //containerBuilder.RegisterModule<DbContext>();
            containerBuilder.Populate(services);
            var container = containerBuilder.Build();
            return new AutofacServiceProvider(container);
        }
    }
}
