using System.Collections.Generic;
using InWords.WebApi.Module;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

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

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
        }
    }
}