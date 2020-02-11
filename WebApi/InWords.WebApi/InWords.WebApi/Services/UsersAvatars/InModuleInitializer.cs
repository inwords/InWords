using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.UsersAvatars.FileUploadAvatar;

namespace InWords.WebApi.Services.UsersAvatars
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<UploadAvatar>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
