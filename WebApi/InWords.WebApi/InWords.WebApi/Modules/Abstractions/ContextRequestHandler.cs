using MediatR;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Abstractions
{
    public class ContextRequestHandler<TQuery, TResult, TContext> : IRequestHandler<TQuery, TResult> where TQuery : IRequest<TResult>
    {
        [Inject]
        private ILogger? Logger { get; set; }

        private readonly Stopwatch stopwatch;
        private readonly TContext context;
        protected TContext Context => context;

        public ContextRequestHandler(TContext context)
        {
            this.context = context;
            stopwatch = new Stopwatch();
        }

        public async Task<TResult> Handle(TQuery request, CancellationToken cancellationToken = default)
        {
            // TODO: Logging
            stopwatch.Start();
            var result = await HandleRequest(request, cancellationToken).ConfigureAwait(false);
            stopwatch.Stop();
            LogLongRunningRequest(request);
            return result;
        }

        public virtual Task<TResult> HandleRequest(TQuery request, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
        private void LogLongRunningRequest(TQuery request)
        {
            if (stopwatch.ElapsedMilliseconds > 500)
            {
                var name = typeof(TQuery).Name;
                string message = $"InWords Long Running Request: {name} ({stopwatch.ElapsedMilliseconds} milliseconds) {request}";
                if (Logger == null)
                {
                    Debug.WriteLine(message);
                }
                else
                {
                    Logger.LogWarning(message);
                }
            }
        }
    }
}
