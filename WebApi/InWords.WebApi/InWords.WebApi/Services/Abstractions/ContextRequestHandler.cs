using MediatR;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Abstractions
{
    public class ContextRequestHandler<TQuery, TResult, TContext> : IRequestHandler<TQuery, TResult> where TQuery : IRequest<TResult>
    {
        [Inject]
        private ILogger logger { get; set; }
        private readonly TContext context;
        public ContextRequestHandler(TContext context)
        {
            this.context = context;
        }

        protected TContext Context => context;

        public Task<TResult> Handle(TQuery request, CancellationToken cancellationToken = default)
        {
            // TODO: Logging
            try
            {
                return HandleRequest(request, cancellationToken);
            }
            catch (Exception e)
            {
                logger.LogError(e, $"{e.Message} on request {request.ToString()}");
                throw;
            }
        }

        public virtual Task<TResult> HandleRequest(TQuery request, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
