using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.UserGameService.GetUsersGameHistory;

namespace InWords.WebApi.Services.UserGameService
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<GetUserGameStoryHandler>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}