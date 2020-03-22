using Autofac;
using InWords.WebApi.Module;

namespace InWords.WebApi.Modules.WordsSets
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            // register password salter service
            // TODO: move in encryption module folder

            // register mediator
            builder.RegisterType<GetMarkedWordsHandler>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<ToDictionaryHandler>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
