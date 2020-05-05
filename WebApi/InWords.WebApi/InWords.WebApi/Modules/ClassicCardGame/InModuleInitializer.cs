using Autofac;
using InWords.WebApi.Module;

namespace InWords.WebApi.Modules.ClassicCardGame
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<SaveLevels>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<EstimateClassicCardGame>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
