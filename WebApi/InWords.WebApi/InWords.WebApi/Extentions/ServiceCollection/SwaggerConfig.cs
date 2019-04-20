using InWords.WebApi.Swagger;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.AppStart
{
    public static class SwaggerConfig
    {
        public static IServiceCollection AddSwaggerInWords(this IServiceCollection services)
        {
            SwaggerFactory.Configure(services);
            return services;
        }
    }
}
