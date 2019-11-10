using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId;
using InWords.WebApi.Services.GameWordsToDictionary.WordsIdsByGameId;

namespace InWords.WebApi.Services.GameWordsToDictionary
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<WordsIdsByGameIdHandler>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<GameToUserHandler>().AsImplementedInterfaces().InstancePerDependency();
            //builder.RegisterType<FileLoader>().InstancePerLifetimeScope();
        }
    }
}