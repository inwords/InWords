using Autofac;
using InWords.WebApi.Module;

namespace InWords.WebApi.Modules.WordsSets
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            // register mediator
            builder.RegisterType<GetMarkedWordsHandler>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<ToDictionaryHandler>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<GetWordSetsHandler>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<GetWordSetLevels>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
