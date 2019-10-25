using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.FtpLoader.Model;

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