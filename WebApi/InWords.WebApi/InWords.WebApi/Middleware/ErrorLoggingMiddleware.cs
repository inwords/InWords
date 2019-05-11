using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace InWords.WebApi.Middleware
{
    public class ErrorLoggingMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger logger;

        public ErrorLoggingMiddleware(RequestDelegate next, ILogger logger)
        {
            this.next = next;
            this.logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                logger.Log(LogLevel.Error, e.Message);
                Debug.WriteLine($"The following error happened: {e.Message}");
                throw;
            }
        }
    }
}
