using Autofac;
using InWords.Protobuf;
using InWords.Service.Encryption;
using InWords.WebApi.Module;
using InWords.WebApi.Modules.Profile.PublicData;
using InWords.WebApi.Services.Users.AccountUpdate;
using InWords.WebApi.Services.Users.EmailUpdate;
using InWords.WebApi.Services.Users.Registration;
using InWords.WebApi.Services.Users.Token;

namespace InWords.WebApi.Services.Users
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            // register password salter service
            // TODO: move in encryption module folder
            builder.RegisterType<SaltGenerator>().AsImplementedInterfaces();

            // register mediator
            builder.RegisterType<UserRegistration>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<UserToken>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<ChangeEmail>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<ConfirmEmail>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<ConfirmEmailLink>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<DeleteAccount>().AsImplementedInterfaces().InstancePerDependency();
            
            builder.RegisterType<FindProfileId>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<FindProfileNickname>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<GetCurrentProfile>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<UpdateProfile>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
