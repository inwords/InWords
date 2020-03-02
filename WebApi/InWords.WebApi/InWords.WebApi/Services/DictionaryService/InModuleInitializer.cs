using Autofac;
using InWords.Service.Encryption;
using InWords.WebApi.Module;
using InWords.WebApi.Services.Users.AccountUpdate;
using InWords.WebApi.Services.Users.EmailUpdate;
using InWords.WebApi.Services.Users.Registration;
using InWords.WebApi.Services.Users.Token;

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
