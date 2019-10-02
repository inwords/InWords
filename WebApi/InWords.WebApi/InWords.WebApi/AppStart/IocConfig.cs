using System;
using System.Linq;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using InWords.Data;
using InWords.Data.Repositories;
using InWords.Data.Repositories.Interfaces;
using InWords.WebApi.Net;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.AppStart
{
    public static class IocConfig
    {
        public static IServiceProvider Configure(this IServiceCollection services, IConfiguration Configuration)
        {
            var builder = new ContainerBuilder();
            builder.Populate(services);

            // register context
            builder.Register(_ => new InWordsDataContext(Configuration.GetConnectionString("MsSqlConnection")))
                .InstancePerLifetimeScope();

            // register emailClient
            builder.Register(_ => Configuration.GetSection("SendGrid").Get<EmailIdentity>());
            builder.RegisterType<EmailSender>();
            builder.RegisterType<TextSender>();
            builder.RegisterType<TemplateSender>();

            // register repositories
            Assembly repositoryAssembly = Assembly.GetAssembly(typeof(InWordsDataContext));
            builder.RegisterAssemblyTypes(repositoryAssembly)
                .Where(a => a.Name.EndsWith("Repository") && a.Namespace.StartsWith("InWords.Data"))
                .InstancePerLifetimeScope();

            // register services
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .Where(a => a.Name.EndsWith("Service")
                && a.Namespace.StartsWith("InWords.WebApi.Services")
                && !a.Namespace.Contains("Abstractions"))
                .InstancePerLifetimeScope();


            builder.RegisterType<EmailVerifierRepository>().As<IEmailVerifierRepository>();

            // register Interfaces
            //builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
            //    .Where(t => t.GetInterfaces().FirstOrDefault(i => i.Name.Equals($"I{t.Name}")) != null)
            //    .As(t => t.GetInterfaces().FirstOrDefault(i => i.Name.Equals($"I{t.Name}")));

            // register FTP
            builder.RegisterType<FileLoader>().InstancePerLifetimeScope();

            IContainer container = builder.Build();

            return new AutofacServiceProvider(container);
        }
    }
}