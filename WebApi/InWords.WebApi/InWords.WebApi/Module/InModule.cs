using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace InWords.WebApi.Module
{
    /// <summary>
    ///     This is to improve project infrastructure using reflection
    ///     and file segregation
    /// </summary>
    public abstract class InModule
    {
        public static IWebHostEnvironment Environment;

        public static IConfiguration Configuration;

        public static IList<InModule> FindModules()
        {
            IEnumerable<InModule> instances = from t in Assembly.GetExecutingAssembly().GetTypes()
                                              where t.IsClass && !t.IsAbstract && t.IsSubclassOf(typeof(InModule))
                                              select Activator.CreateInstance(t) as InModule;
            return instances.ToList();
        }

        /// <summary>
        ///     This is to segregate Ioc configuration layer from startup class
        /// </summary>
        public virtual void ConfigureIoc(ContainerBuilder builder) { }


        /// <summary>
        ///     This is to provide service collection to configure
        /// </summary>
        /// <param name="services"></param>
        /// <returns>Service collection</returns>
        public virtual void ConfigureServices(IServiceCollection services) { }

        /// <summary>
        ///    This is to provide ApplicationBuilder to configure
        /// </summary>
        /// <param name="app"></param>
        public virtual void ConfigureApp(IApplicationBuilder app) { }

        // Database
        // Api
    }
}