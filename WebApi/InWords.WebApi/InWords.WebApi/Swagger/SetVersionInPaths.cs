using System.Collections.Generic;
using System.Linq;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace InWords.WebApi.Swagger
{
    public class SetVersionInPaths : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            var swaggerDocPaths = new OpenApiPaths();
            foreach (string key in swaggerDoc.Paths.Keys)
            {
                swaggerDocPaths.Add(key.Replace("v{version}", swaggerDoc.Info.Version), swaggerDoc.Paths[key]);
            }
            swaggerDoc.Paths = swaggerDocPaths;


        }
    }
}