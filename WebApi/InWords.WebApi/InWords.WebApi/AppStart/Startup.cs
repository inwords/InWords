﻿using Autofac;
using InWords.Common.Extensions;
using InWords.Data.Repositories;
using InWords.Data.Repositories.Interfaces;
using InWords.WebApi.Extensions.ServiceCollection;
using InWords.WebApi.Module;
using InWords.WebApi.Prometheus;
using InWords.WebApi.Services.OAuth2.JwtProviders;
using InWords.WebApi.Services.OAuth2.Models;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;

namespace InWords.WebApi.AppStart
{
	/// <summary>
	///     Main startup class
	/// </summary>
	public class Startup
	{
		public IConfiguration Configuration { get; }

		/// <summary>
		///     Startup constructor
		/// </summary>
		/// <param name="env"></param>
		public Startup(IWebHostEnvironment env)
		{
			IConfigurationBuilder builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", false, true)
				.AddJsonFile("AppData/appsettings.security.json", false, true)
				.AddJsonFile($"appsettings{env.EnvironmentName}.json", true)
				.AddEnvironmentVariables();
			Configuration = builder.Build();

			InModule.Configuration = Configuration;
			InModule.Environment = env;
		}

		/// <summary>
		///     This is the service configuration
		/// </summary>

		/// <summary>
		///     This method gets called by the runtime. Use this method to add services to the container.
		/// </summary>
		/// <param name="services"></param>
		public void ConfigureServices(IServiceCollection services)
		{
			// Should be before AddMvc method. Allow use api from different sites 
			services.AddCors(o =>
			{
				o.AddPolicy("AllowAll", builder =>
			   {
				   builder
				   .AllowAnyOrigin()
				   .AllowAnyMethod()
				   .AllowAnyHeader()
				   .WithExposedHeaders("Grpc-Status", "Grpc-Message");
			   });
			});

			// Mvc and controllers mapping
			services
				.AddMvc(o => o.EnableEndpointRouting = false)
				.AddNewtonsoftJson()
				.SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

			JwtSettings jwtSettings = Configuration.GetSection("JwtSettings").Get<JwtSettings>();
			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(new SymmetricJwtTokenProvider(jwtSettings).ValidateOptions);

			//services.AddScoped<IAuthService, AuthService>();
			services.AddAuthorization();
			// api version info
			services.AddApiVersioningInWords();

			// Register the Swagger generator, defining 1 or more Swagger documents
			services.AddSwaggerInWords();
			services.AddSingleton<IConfiguration>(Configuration);
			services.AddHttpClient();
			// to register types of modules
			Program.InModules.ForEach(m => m.ConfigureServices(services));
		}

		/// <summary>
		///     This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		/// </summary>
		/// <param name="app"></param>
		/// <param name="env"></param>
		/// <param name="loggerFactory"></param>
		public void Configure(IApplicationBuilder app, IHostEnvironment env)
		{
			app.UseRouting();
			app.UseCors("AllowAll"); // should be before UseMvc but after UserRouting and before Authorization and UseAuthorization
			app.UseAuthentication(); // should be before UseEndpoints but after UseRouting
			app.UseAuthorization();  // should be before UseEndpoints but after UseRouting
			app.UseMiddleware<ResponseMetricMiddleware>();
			app.UseMvc();

			app.UseForwardedHeaders(new ForwardedHeadersOptions
			{
				ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
			});
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
				c.SwaggerEndpoint("/swagger/v2/swagger.json", "InWords Web API V2 (grpc is allowed)");
				c.SwaggerEndpoint("/swagger/v1.1/swagger.json", "InWords Web API V1.1");
				c.SwaggerEndpoint("/swagger/v1.0/swagger.json", "InWords Web API V1");
				c.RoutePrefix = "docs";
			});


			// Enable middleware to generated logs as a text file.
			//loggerFactory;

			app.UseDeveloperExceptionPage();

			//app.UseHttpMetrics();
			// to register types of modules
			Program.InModules.ForEach(m => m.ConfigureApp(app));
		}

		public void ConfigureContainer(ContainerBuilder builder)
		{
			// to register types of modules
			Program.InModules.ForEach(m => m.ConfigureIoc(builder));

#warning remove this
			// register services
			builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
				.Where(a => a.Namespace != null && a.Name.EndsWith("Service") &&
							a.Namespace.StartsWith("InWords.WebApi.Services") && !a.Namespace.Contains("Abstractions"))
				.InstancePerLifetimeScope();
			//end warning

			builder.RegisterType<EmailVerifierRepository>().As<IEmailVerifierRepository>();

			// mediator itself
			builder.RegisterType<Mediator>().As<IMediator>().InstancePerLifetimeScope();

			// request & notification handlers
			builder.Register<ServiceFactory>(context =>
			{
				var c = context.Resolve<IComponentContext>();
				return t => c.Resolve(t);
			});
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