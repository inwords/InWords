using InWords.Common.Extensions;
using Microsoft.AspNetCore.Http;
using Org.BouncyCastle.Utilities.Collections;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
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
            if (httpContext == null)
                return;

            var path = httpContext.Request.Path.Value;

            if (Ignore.Contains(path))
            {
                await _request.Invoke(httpContext).ConfigureAwait(false);
                return;
            }


            path = MetricPathTrimmer(path);

            var sw = Stopwatch.StartNew();

            try
            {
                await _request.Invoke(httpContext).ConfigureAwait(false);
            }
            finally
            {
                sw.Stop();
                reporter.RegisterRequest();
                reporter.RegisterResponseTime(httpContext.Response.StatusCode, path, sw.Elapsed);
            }
        }

        private static readonly HashSet<string> Ignore = new HashSet<string>
        {
            "/metrics"
        };

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1308:Нормализуйте строки до прописных букв", Justification = "<Ожидание>")]
        public static string MetricPathTrimmer(string path)
        {
            if (path == null)
                return string.Empty;

            path = path.ToLower(CultureInfo.InvariantCulture);
            int trimNumber = 2;
            if (path.StartsWith("/v", StringComparison.InvariantCultureIgnoreCase))
                trimNumber = 3;

            int trimIndex = path.IndexOfN("/", trimNumber);
            if (trimIndex > 0)
            {
                path = path.Substring(0, trimIndex);
            }
            return path;
        }
    }
}
