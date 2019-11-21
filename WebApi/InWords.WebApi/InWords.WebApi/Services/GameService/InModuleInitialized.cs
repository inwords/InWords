using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.GameService.GetGameLevels;


namespace InWords.WebApi.Services.GameService
{
    public class InModuleInitialized : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<GameLevelsByGameId>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}
