using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Module;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Prometheus;

namespace InWords.WebApi.gRPC
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddGrpc();
            services.AddGrpcWeb(o => o.GrpcWebEnabled = true);
        }

        public override void ConfigureApp(IApplicationBuilder app)
        {
            IWebHostEnvironment env = Environment;
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseGrpcWeb();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapMetrics();
                // Communication with gRPC endpoints must be made through a gRPC client.
                // To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909
                endpoints.MapGrpcService<GreeterService>();
                endpoints.MapGrpcService<ProfileService>();
                endpoints.MapGrpcService<WordsSetService>();
                endpoints.MapGrpcService<DictionaryService>();
                endpoints.MapGrpcService<AuthService>();

                endpoints.MapGet("/",
                    context => context.Response.WriteAsync(
                        "Communication with gRPC endpoints must be made through a gRPC client. " +
                        "To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909"));
            });
        }
    }
}