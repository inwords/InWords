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
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
