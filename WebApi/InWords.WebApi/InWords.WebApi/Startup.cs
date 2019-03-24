using System;
using System.IO;
using InWords.Auth;
using InWords.Data.Models;
using InWords.WebApi.Providers.FIleLogger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace InWords.WebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings{env.EnvironmentName}.json", true)
                .AddJsonFile("appsettings.security.json", false, true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(AuthOptions.TokenProvider.ValidateOptions);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // 'scoped' in ASP.NET means "per HTTP request"
            services.AddScoped(
                _ => new InWordsDataContext(Configuration.GetConnectionString("DefaultConnection")));

            // api versioning
            services.AddApiVersioning(o =>
            {
                o.ApiVersionReader = new HeaderApiVersionReader("x-api-version");
                o.ReportApiVersions = true;
                o.AssumeDefaultVersionWhenUnspecified = true;
                o.DefaultApiVersion = new ApiVersion(1, 0);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            LoggerConfiguration(loggerFactory);

            // TODO: remove on Release
            // if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseCors(builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            app.UseMvc();
        }

        public void LoggerConfiguration(ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory,
                $"log/#log-{DateTime.Now:yyyy-MM-dd-HH-mm-ss}.txt"));
            ILogger logger = loggerFactory.CreateLogger("FileLogger");
            logger.LogInformation("Processing request {0}", 0);
        }
    }
}

// feature-used when adding new application-level functionality
// fix - if fixed some serious bug
// docs — all the documentation
// style - correct typos, correct formatting
// refactor-refactor application code
// test — all that is connected with the testing
// chore-normal code maintenance