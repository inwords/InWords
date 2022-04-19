using Autofac;
using InWords.Data;
using InWords.WebApi.Module;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace InWords.WebApi.Services.BaseDataContext
{
	public class InModuleInitializer : InModule
	{
		public override void ConfigureIoc(ContainerBuilder builder)
		{
			var connection = "DefaultConnection";
			// register context
			var configuration = Configuration.GetConnectionString(connection);
			builder.Register(_ => new InWordsDataContext(configuration))
				.InstancePerLifetimeScope();

			builder.Register(_ => new InWordsDataContextJob(configuration));


			// register repositories
			Assembly repositoryAssembly = Assembly.GetAssembly(typeof(InWordsDataContext));
			builder.RegisterAssemblyTypes(repositoryAssembly)
				.Where(a => a.Namespace != null && a.Name.EndsWith("Repository") &&
							a.Namespace.StartsWith("InWords.Data"))
				.InstancePerLifetimeScope();
		}
	}
}