using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Modules.ClassicCardGame.Service;

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
