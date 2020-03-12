using Autofac.Extensions.DependencyInjection;
using InWords.WebApi.Module;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Net;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using Serilog;
using System.Linq;
using System.Globalization;

namespace InWords.WebApi.AppStart
{
    public class Program
    {
        public static IList<InModule> InModules;

        public static void Main(string[] args)
        {
            InModules = InModule.FindModules();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateWebHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureWebHostDefaults(webHostBuilder =>
                {
                    int[] ports = Environment.GetEnvironmentVariable("PUBLIC-PORTS").Split(",").Select(d => int.Parse(d, NumberFormatInfo.InvariantInfo)).ToArray();
                    webHostBuilder
                    .UseStartup<Startup>()
                    .UseKestrel((hostingContext, options) =>
                    {
                        options.Listen(IPAddress.Loopback, ports[0],
                            listenOptions => listenOptions.Protocols = HttpProtocols.Http1
                            );

                    options.Listen(IPAddress.Loopback, ports[1],
                        listenOptions =>
                        {
                            listenOptions.UseHttps();
                            listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                        });

                    options.Listen(IPAddress.Loopback, ports[2], o =>
                    {
                        o.UseHttps();
                        o.Protocols = HttpProtocols.Http2;
                    });
                })
                    .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
                    .ReadFrom.Configuration(hostingContext.Configuration)
                    .Enrich.FromLogContext()
                    .WriteTo.Console()
                    .WriteTo.File(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, $"log/{DateTime.Now:yyyy-MM-dd-HH-mm}.txt")));
        });
        }
}
}