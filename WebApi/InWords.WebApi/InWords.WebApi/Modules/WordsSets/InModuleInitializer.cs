using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.WordsSets.GetWords;

namespace InWords.WebApi.Services.WordsSets
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            // register password salter service
            // TODO: move in encryption module folder

            // register mediator
            builder.RegisterType<GetMarkedWordsHandler>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
