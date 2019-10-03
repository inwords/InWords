using Autofac;
using InWords.WebApi.Module;
using Microsoft.Extensions.Configuration;

namespace InWords.WebApi.Services.Email
{
    public class EmailInModule : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.Register(_ => Configuration.GetSection("SendGrid").Get<EmailIdentity>());
            builder.RegisterType<EmailSender>();
            builder.RegisterType<TextSender>();
            builder.RegisterType<TemplateSender>();
        }
    }
}
