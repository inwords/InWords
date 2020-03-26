﻿using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Modules.DictionaryService.Words;

namespace InWords.WebApi.Modules.DictionaryService
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<AddWords>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<GetUserWords>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<UpdateWords>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<DeleteWords>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<Lookup>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}