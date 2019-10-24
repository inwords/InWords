using System.Reflection;
using Autofac;
using InWords.Data;
using InWords.WebApi.Module;
using Microsoft.Extensions.Configuration;

namespace InWords.WebApi.Services.BaseDataContext
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            // register context
            builder.Register(_ => new InWordsDataContext(Configuration.GetConnectionString("DefaultConnection")))
                .InstancePerLifetimeScope();

            // register repositories
            Assembly repositoryAssembly = Assembly.GetAssembly(typeof(InWordsDataContext));
            builder.RegisterAssemblyTypes(repositoryAssembly)
                .Where(a => a.Name.EndsWith("Repository") && a.Namespace.StartsWith("InWords.Data"))
                .InstancePerLifetimeScope();
        }
    }
}