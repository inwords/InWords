using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;

namespace InWords.WebApi.Swagger
{
    public class SetVersionInPaths : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            if (swaggerDoc == null)
                throw new ArgumentNullException(nameof(swaggerDoc));

            var swaggerDocPaths = new OpenApiPaths();
            foreach (string key in swaggerDoc.Paths.Keys)
                swaggerDocPaths.Add(key.Replace("v{version}", swaggerDoc.Info.Version, StringComparison.InvariantCultureIgnoreCase), swaggerDoc.Paths[key]);
            swaggerDoc.Paths = swaggerDocPaths;
        }
    }
}