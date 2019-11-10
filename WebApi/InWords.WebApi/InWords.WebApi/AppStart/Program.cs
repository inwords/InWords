﻿using System.Collections.Generic;
using System.Net;
using Autofac.Extensions.DependencyInjection;
using InWords.WebApi.Module;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

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
                            options.Listen(IPAddress.Loopback, 5100);
                            options.Listen(IPAddress.Loopback, 5101,
                                listenOptions => { listenOptions.UseHttps(); });
                        });
                });
        }
    }
}