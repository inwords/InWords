using Autofac;
using InWords.WebApi.Module;

namespace InWords.WebApi.Services.GameWordsToDictionary
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            //builder.RegisterType<MyHandler>().AsImplementedInterfaces().InstancePerDependency();
            //builder.RegisterType<FileLoader>().InstancePerLifetimeScope();
        }
    }
}