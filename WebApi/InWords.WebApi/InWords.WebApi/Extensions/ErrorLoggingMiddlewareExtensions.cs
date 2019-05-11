using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.WebApi.Middleware;
using Microsoft.AspNetCore.Builder;

namespace InWords.WebApi.Extensions
{
    public static class ErrorLoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseErrorLogging(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorLoggingMiddleware>();
        }
    }
}
