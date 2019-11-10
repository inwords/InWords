﻿using System.Reflection;
using Autofac;
using InWords.Data;
using InWords.WebApi.Module;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace InWords.WebApi.Services.BaseDataContext
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            var connection = "ProductionConnection";
            if (Environment.IsDevelopment()) connection = "DefaultConnection";

            // register context
            builder.Register(_ => new InWordsDataContext(Configuration.GetConnectionString(connection)))
                .InstancePerLifetimeScope();

            // register repositories
            Assembly repositoryAssembly = Assembly.GetAssembly(typeof(InWordsDataContext));
            builder.RegisterAssemblyTypes(repositoryAssembly)
                .Where(a => a.Namespace != null && a.Name.EndsWith("Repository") &&
                            a.Namespace.StartsWith("InWords.Data"))
                .InstancePerLifetimeScope();
        }
    }
}