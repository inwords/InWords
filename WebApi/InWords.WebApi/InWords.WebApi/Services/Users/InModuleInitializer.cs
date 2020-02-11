using Autofac;
using InWords.WebApi.Module;

namespace InWords.WebApi.Services.Users
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            //builder.RegisterType<UploadAvatar>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
