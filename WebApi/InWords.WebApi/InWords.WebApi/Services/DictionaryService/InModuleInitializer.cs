using Autofac;
using InWords.WebApi.Module;

namespace InWords.WebApi.Services.DictionaryService
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            //builder.RegisterType<DeleteAccount>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
