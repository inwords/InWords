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
                    GetPorts(out int https, out int https2);
                    string? path = AppDomain.CurrentDomain.BaseDirectory;
                    if (string.IsNullOrWhiteSpace(path)) path = "";

                    webHostBuilder
                    .UseStartup<Startup>()
                    .UseKestrel((hostingContext, options) =>
                    {
                        options.Listen(IPAddress.Loopback, https,
                            listenOptions =>
                            {
                                listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                            });

                        options.Listen(IPAddress.Loopback, https2, o =>
                        {
                            o.UseHttps();
                            o.Protocols = HttpProtocols.Http2;
                        });
                    })
                    .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
                    .ReadFrom.Configuration(hostingContext.Configuration)
                    .Enrich.FromLogContext()
                    .WriteTo.Console()
                    .WriteTo.File(Path.Combine(path, $"log/{DateTime.Now:yyyy-MM-dd-HH-mm}.txt")));
                });
        }

        private static void GetPorts(out int https, out int https2)
        {
            https = 5101;
            https2 = 5102;

            string? INWHTTPS = Environment.GetEnvironmentVariable("INWHTTPS");
            string? INWHTTPS2 = Environment.GetEnvironmentVariable("INWHTTPS2");

            Console.WriteLine($"Environment {INWHTTPS} {INWHTTPS2}");

            if (!string.IsNullOrWhiteSpace(INWHTTPS))
                https = int.Parse(INWHTTPS, NumberFormatInfo.InvariantInfo);
            if (!string.IsNullOrWhiteSpace(INWHTTPS2))
                https2 = int.Parse(INWHTTPS2, NumberFormatInfo.InvariantInfo);
        }
    }
}