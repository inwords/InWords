namespace InWords.WebApi
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using InWords.Auth;
    using Microsoft.IdentityModel.Tokens;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region Authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                                .AddJwtBearer(options =>
                                {
                                    options.RequireHttpsMetadata = false; //SSL при отправке токена не используется
                                    options.TokenValidationParameters = new TokenValidationParameters
                                    {
                                        // укзывает, будет ли валидироваться издатель при валидации токена
                                        ValidateIssuer = true,
                                        // строка, представляющая издателя
                                        ValidIssuer = AuthOptions.ISSUER,

                                        // будет ли валидироваться потребитель токена
                                        ValidateAudience = true,
                                        // установка потребителя токена
                                        ValidAudience = AuthOptions.AUDIENCE,
                                        // будет ли валидироваться время существования
                                        ValidateLifetime = true,

                                        // установка ключа безопасности
                                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                                        // валидация ключа безопасности
                                        ValidateIssuerSigningKey = true,
                                    };
                                });
            #endregion

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
