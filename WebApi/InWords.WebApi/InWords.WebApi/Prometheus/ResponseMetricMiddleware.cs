using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Prometheus
{
    public class ResponseMetricMiddleware
    {
        private readonly RequestDelegate _request;

        public ResponseMetricMiddleware(RequestDelegate request)
        {
            _request = request ?? throw new ArgumentNullException(nameof(request));
        }

        public async Task Invoke(HttpContext httpContext, MetricReporter reporter)
        {
            var path = httpContext.Request.Path.Value;

            if (path == "/metrics")
            {
                await _request.Invoke(httpContext).ConfigureAwait(false);
                return;
            }
            string ignore = "email/confirm";
            if (path.Contains(ignore, StringComparison.InvariantCultureIgnoreCase))
            {
                path = path.Remove(path.IndexOf(ignore, StringComparison.InvariantCultureIgnoreCase) + ignore.Length);
            }

            var sw = Stopwatch.StartNew();

            try
            {
                await _request.Invoke(httpContext).ConfigureAwait(false);
            }
            finally
            {
                sw.Stop();
                reporter.RegisterRequest();
                reporter.RegisterResponseTime(httpContext.Response.StatusCode, httpContext.Request.Path.Value, sw.Elapsed);
            }
        }
    }
}
