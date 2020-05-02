﻿using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWordsIds;

namespace InWords.WebApi.Services.UserWordPairService
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<GetLearningUserWords>().AsImplementedInterfaces().InstancePerDependency();
            builder.RegisterType<GetLearningUserWordsId>().AsImplementedInterfaces().InstancePerDependency();
        }
    }
}