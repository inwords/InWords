using System;
using System.IO;
using InWords.Auth;
using InWords.Data.Models;
using InWords.WebApi.Providers.FIleLogger;
using InWords.WebApi.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace InWords.WebApi
{
    /// <summary>
    ///     Main startup class
    /// </summary>
    public class Startup
    {
        /// <summary>
        ///     Startup constructor
        /// </summary>
        /// <param name="env"></param>
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

        /// <summary>
        ///     This is the service configuration
        /// </summary>
        public IConfiguration Configuration { get; }


        /// <summary>
        ///     This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services"></param>
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
                o.ReportApiVersions = true;
                o.AssumeDefaultVersionWhenUnspecified = true;
                o.DefaultApiVersion = new ApiVersion(1, 0);
            });

            // Register the Swagger generator, defining 1 or more Swagger documents
            SwaggerFactory.Configure(services);
        }

        /// <summary>
        ///     This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="loggerFactory"></param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // To design Swashbuckle components in a corporate style,
            // you need to add resources to serve static files
            // and then build a folder structure to accommodate them.
            app.UseStaticFiles();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1.0/swagger.json", "My API V1");
                c.SwaggerEndpoint("/swagger/v1.1/swagger.json", "My API V1.1");
                c.RoutePrefix = string.Empty;
            });

            // Enable middleware to generated logs as a text file.
            LoggerConfiguration(loggerFactory);

            // TODO: remove on Release
            // if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseAuthentication();
            app.UseCors(builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            app.UseMvc();
        }

        /// <summary>
        ///     Configure the logger data format and file location
        /// </summary>
        /// <param name="loggerFactory"></param>
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