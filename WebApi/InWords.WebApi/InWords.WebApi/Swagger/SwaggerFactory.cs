using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
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
                c.SwaggerDoc("v1.0", new OpenApiInfo { Version = "v1.0", Title = "API V1.0" });
                c.SwaggerDoc("v1.1", new OpenApiInfo { Version = "v1.1", Title = "API V1.1" });
                c.SwaggerDoc("v2", new OpenApiInfo { Version = "v2", Title = "API V2 Allow Json & GRPC" });
                //Enable export XML dev comments to swagger
                ConfigureSwaggerComments(c);
                //Provide custom strategy for selecting api 
                c.DocInclusionPredicate(DocInclusionPredicate);
                //Enable custom doc and operation filters
                c.OperationFilter<RemoveVersionParameters>();
                c.DocumentFilter<SetVersionInPaths>();
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.OperationFilter<AuthorizeCheckOperationFilter>();
            });
        }

        private static bool DocInclusionPredicate(string docName, ApiDescription apiDescription)
        {
            if (!apiDescription.TryGetMethodInfo(out MethodInfo methodInfo)) return false;

            IEnumerable<ApiVersion> versions = GetApiVersions(methodInfo);
            return versions.Any(v => $"v{v.ToString()}" == docName);
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