using Autofac;
using InWords.Data;
using InWords.WebApi.Module;
using InWords.WebApi.Services.FtpLoader.Model;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace InWords.WebApi.Services.FtpLoader
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<FileLoader>().InstancePerLifetimeScope();
        }
    }
}
