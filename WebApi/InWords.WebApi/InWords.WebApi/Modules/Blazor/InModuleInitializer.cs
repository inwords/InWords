using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Modules.DictionaryServiceHandler.Words;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.Blazor
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureApp(IApplicationBuilder app)
        {
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", context =>
                {
                    context.Response.Redirect("/control/");
                    return context.Response.WriteAsync("Redirected");
                });
            });

            app.MapWhen(ctx => ctx.Request.Path.StartsWithSegments("/control"), first =>
            {
                first.UseBlazorFrameworkFiles("/control");
                first.UseStaticFiles();

                first.UseRouting();
                first.UseEndpoints(endpoints =>
                {
                    //endpoints.MapControllers();
                    endpoints.MapDefaultControllerRoute();
                    endpoints.MapFallbackToFile("/control/{*path:nonfile}", "control/index.html");
                });
            });
        }
    }
}
