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

					GetPorts(out int http1, out int http2);

					string? path = AppDomain.CurrentDomain.BaseDirectory;
					if (string.IsNullOrWhiteSpace(path)) path = "";

					webHostBuilder
					.UseStartup<Startup>()
					.UseKestrel((hostingContext, options) =>
					{
						options.Listen(IPAddress.Any, http1,
							listenOptions => listenOptions.Protocols = HttpProtocols.Http1
						);

						options.Listen(IPAddress.Any, http2,
							listenOptions =>
							{
								listenOptions.Protocols = HttpProtocols.Http2;
							});
					})
					.UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
					.ReadFrom.Configuration(hostingContext.Configuration)
					.Enrich.FromLogContext()
					.WriteTo.Console()
					.WriteTo.File(Path.Combine(path, $"log/{DateTime.Now:yyyy-MM-dd-HH-mm}.txt")));
				});
		}

		private static void GetPorts(out int http1, out int http2)
		{
			http1 = 5100;
			http2 = 5101;
			string? INWHTTP = Environment.GetEnvironmentVariable("INWHTTP");
			string? INWHTTPS = Environment.GetEnvironmentVariable("INWHTTPS");
			Console.WriteLine($"Environment {INWHTTP} {INWHTTPS}");
			if (!string.IsNullOrWhiteSpace(INWHTTP))
				http1 = int.Parse(INWHTTP, NumberFormatInfo.InvariantInfo);
			if (!string.IsNullOrWhiteSpace(INWHTTPS))
				http2 = int.Parse(INWHTTPS, NumberFormatInfo.InvariantInfo);
		}
	}
}