using InWords.WebApi.Swagger;
using Microsoft.Extensions.DependencyInjection;

namespace InWords.WebApi.Extensions.ServiceCollection
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