using System.Linq;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace InWords.WebApi.Swagger
{
    /// <summary>
    ///     This is need to Remove Version Parameters from url path in Swagger UI.
    ///     For example v{version}/get replace to v1.1/get
    /// </summary>
    public class RemoveVersionParameters : IOperationFilter
    {
        /// <summary>
        ///     Operation filter interfere method
        /// </summary>
        /// <param name="operation"></param>
        /// <param name="context"></param>
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            OpenApiParameter versionParameter = operation.Parameters?.SingleOrDefault(p => p.Name == "version");
            if (versionParameter != null)
                operation.Parameters.Remove(versionParameter);
        }
    }
}