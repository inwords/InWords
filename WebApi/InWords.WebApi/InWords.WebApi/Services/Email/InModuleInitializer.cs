using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Services.Email.EmailSenders;
using InWords.WebApi.Services.Email.Models;
using Microsoft.Extensions.Configuration;

namespace InWords.WebApi.Services.Email
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.Register(_ => Configuration.GetSection("SendGrid").Get<EmailIdentity>());
            builder.RegisterType<EmailSender>();
            builder.RegisterType<TextSender>();
            builder.RegisterType<TemplateSender>();
            builder.RegisterType<EmailTemplateSender>().AsImplementedInterfaces();
            builder.RegisterType<EmailVerifierService>().AsImplementedInterfaces();
        }
    }
}