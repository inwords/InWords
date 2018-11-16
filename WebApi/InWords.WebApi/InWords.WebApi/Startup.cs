namespace InWords.WebApi
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using InWords.Auth;
    using InWords.Data;
    using Microsoft.Extensions.Logging;
    using InWords.WebApi.Providers;
    using System.IO;
    using System;
    using Microsoft.AspNetCore.Mvc.Versioning;

    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings{env.EnvironmentName}.json", optional: true)
                .AddJsonFile("appsettings.security.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
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

            //if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseMvc();
        }

        private void LoggerConfiguration(ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, $"log/#log-{DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss")}.txt"));
            var logger = loggerFactory.CreateLogger("FileLogger");
            logger.LogInformation("Processing request {0}", 0);
        }
    }
}

///feature — используется при добавлении новой функциональности уровня приложения
///fix — если исправили какую-то серьезную багу
///docs — всё, что касается документации
///style — исправляем опечатки, исправляем форматирование
///refactor — рефакторинг кода приложения
///test — всё, что связано с тестированием
///chore — обычное обслуживание кода
