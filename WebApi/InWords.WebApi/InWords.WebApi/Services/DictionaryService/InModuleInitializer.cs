using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.DictionaryService.Words;

namespace InWords.WebApi.Services.DictionaryService
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<AddWords>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<GetUserWords>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
