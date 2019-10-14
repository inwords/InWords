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
            swaggerDoc.Paths = (OpenApiPaths)swaggerDoc.Paths.ToDictionary(
                path => path.Key.Replace("v{version}", swaggerDoc.Info.Version),
                path => path.Value);
        }
    }
}