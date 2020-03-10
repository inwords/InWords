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
                    webHostBuilder
                    .UseStartup<Startup>()
                    .UseKestrel((hostingContext, options) =>
                    {
                        options.Listen(IPAddress.Loopback, 5100,
                            listenOptions => listenOptions.Protocols = HttpProtocols.Http1
                            );

                        options.Listen(IPAddress.Loopback, 5101,
                            listenOptions =>
                            {
                                listenOptions.UseHttps();
                                listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                            });

                        options.Listen(IPAddress.Loopback, 5102, o =>
                        {
                            o.UseHttps();
                            o.Protocols = HttpProtocols.Http2;
                        });
                    });
                });
        }
    }
}