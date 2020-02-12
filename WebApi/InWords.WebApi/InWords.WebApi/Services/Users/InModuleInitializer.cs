using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.Users.Registration;

namespace InWords.WebApi.Services.Users
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<UserRegistration>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
