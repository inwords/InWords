﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace InWords.WebApi.AppStart
{
    public class SecureConnectionMiddleware
    {
        private readonly RequestDelegate _next;

        public SecureConnectionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            bool loadbalancerReceivedSSLRequest = string.Equals(context.Request.Headers["X-Forwarded-Proto"], "https");
            bool serverReceivedSSLRequest = context.Request.IsHttps;

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