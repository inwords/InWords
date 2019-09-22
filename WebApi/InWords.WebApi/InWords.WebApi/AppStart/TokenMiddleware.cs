using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace InWords.WebApi.AppStart
{
    public class SecureConnectionMiddleware
    {
        private readonly RequestDelegate _next;

        public SecureConnectionMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var loadbalancerReceivedSSLRequest = string.Equals(context.Request.Headers["X-Forwarded-Proto"], "https");
            var serverReceivedSSLRequest = context.Request.IsHttps;

            if (loadbalancerReceivedSSLRequest || serverReceivedSSLRequest)
            {
                // SSL in use.
                await _next.Invoke(context);
            }
            else
            {
                // SSL not in use.
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Connection insecure, user https");
            }
        }
    }
}