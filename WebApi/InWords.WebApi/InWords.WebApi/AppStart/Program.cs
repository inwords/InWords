using Autofac.Extensions.DependencyInjection;
using InWords.WebApi.Module;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Net;

namespace InWords.WebApi.AppStart
{
	public static class Program
	{
		public static readonly IList<InModule> InModules = InModule.FindModules();
		public static void Main(string[] args)
		{
			CreateWebHostBuilder(args).Build().Run();
		}

		public static IHostBuilder CreateWebHostBuilder(string[] args)
		{
			return Host.CreateDefaultBuilder(args)
				.UseServiceProviderFactory(new AutofacServiceProviderFactory())
				.ConfigureWebHostDefaults(webHostBuilder =>
				{
					string? path = AppDomain.CurrentDomain.BaseDirectory;
					if (string.IsNullOrWhiteSpace(path)) path = "";

					webHostBuilder
					.UseStartup<Startup>()
					.UseKestrel((hostingContext, options) =>
					{
						options.Listen(IPAddress.Any, 8080);
					})
					.UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
					.ReadFrom.Configuration(hostingContext.Configuration)
					.Enrich.FromLogContext()
					.WriteTo.Console()
					.WriteTo.File(Path.Combine(path, $"log/{DateTime.Now:yyyy-MM-dd-HH-mm}.txt")));
				});
		}
	}
}