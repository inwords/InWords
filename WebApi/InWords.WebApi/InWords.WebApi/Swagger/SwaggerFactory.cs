using InWords.Common.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;

namespace InWords.WebApi.Swagger
{
    public class SwaggerFactory
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v2", new OpenApiInfo { Version = "v2", Title = "API V2 Allow Json & GRPC" });
                c.SwaggerDoc("v1.1", new OpenApiInfo { Version = "v1.1", Title = "API V1.1" });
                c.SwaggerDoc("v1.0", new OpenApiInfo { Version = "v1.0", Title = "API V1.0" });
                //Enable export XML dev comments to swagger
                ConfigureSwaggerComments(c);
                //Provide custom strategy for selecting api 
                c.DocInclusionPredicate(DocInclusionPredicate);
                //Enable custom doc and operation filters
                c.OperationFilter<RemoveVersionParameters>();
                // Enable version in path visualisation
                c.DocumentFilter<SetVersionInPaths>();
                // Enable lock mark visualisation
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.ExampleFilters();
                c.OperationFilter<AuthorizeCheckOperationFilter>();
            });


            var types = AppDomain.CurrentDomain
                .GetAssemblies()
                .SelectMany(a => a.GetTypes())
                .Where(t => String.Equals(t.Namespace, "InWords.WebApi.Swagger.Examples", StringComparison.Ordinal))
                .ToArray();

            types.ForEach((t) =>
            {
                services.AddSwaggerExamplesFromAssemblyOf(t);
            });
        }


        private static bool DocInclusionPredicate(string docName, ApiDescription apiDescription)
        {
            if (!apiDescription.TryGetMethodInfo(out MethodInfo methodInfo)) return false;

            IEnumerable<ApiVersion> versions = GetApiVersions(methodInfo);
            return versions.Any(v => $"v{v}" == docName);
        }

        /// <summary>
        ///     This is to ger api version from member info to swagger configuration
        /// </summary>
        /// <param name="methodInfo"></param>
        /// <returns>ApiVersions</returns>
        private static IEnumerable<ApiVersion> GetApiVersions(MemberInfo methodInfo)
        {
            object[] customAttributes = methodInfo
                .DeclaringType
                .GetCustomAttributes(true);

            IEnumerable<ApiVersion> versions = customAttributes
                .OfType<ApiVersionAttribute>()
                .SelectMany(attr => attr.Versions);
            return versions;
        }

        /// <summary>
        ///     This is to enable swagger external dev xml comments.
        ///     Warning! To use this enable xml comments output
        /// </summary>
        /// <param name="c"></param>
        private static void ConfigureSwaggerComments(SwaggerGenOptions c)
        {
            string filePath = Path.Combine(AppContext.BaseDirectory, "InWords.WebApi.xml");
            if (File.Exists(filePath))
                c.IncludeXmlComments(filePath);
            else
                Debug.WriteLine("Swagger comments not found");
        }
    }
}