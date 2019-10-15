using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Autofac;
using Microsoft.Extensions.Configuration;

namespace InWords.WebApi.Module
{
    /// <summary>
    ///     This is to improve project infrastructure using reflection
    ///     and file segragation
    /// </summary>
    public abstract class InModule
    {
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
        public abstract void ConfigureIoc(ContainerBuilder builder);

        // Service

        // Repository

        // Api
    }
}