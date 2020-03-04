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
        private ILogger logger { get; set; }
        private readonly TContext context;
        private Stopwatch stopwatch;

        public ContextRequestHandler(TContext context)
        {
            this.context = context;
        }

        protected TContext Context => context;

        public async Task<TResult> Handle(TQuery request, CancellationToken cancellationToken = default)
        {
            // TODO: Logging

            stopwatch.Start();
            var result = await HandleRequest(request, cancellationToken).ConfigureAwait(false);
            stopwatch.Stop();
            if (stopwatch.ElapsedMilliseconds > 500)
            {
                var name = typeof(TQuery).Name;
                logger.LogWarning($"InWords Long Running Request: {name} ({stopwatch.ElapsedMilliseconds} milliseconds) {request}");
            }
            return result;
        }

        public virtual Task<TResult> HandleRequest(TQuery request, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
