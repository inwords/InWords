using Autofac;
using InWords.WebApi.Module;
using InWords.WebApi.Modules.DictionaryServiceHandler.Words;
using Microsoft.AspNetCore.Builder;

namespace InWords.WebApi.Modules.Blazor
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureApp(IApplicationBuilder app)
        {
            app.UseBlazorFrameworkFiles();
            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapDefaultControllerRoute();
                endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}
