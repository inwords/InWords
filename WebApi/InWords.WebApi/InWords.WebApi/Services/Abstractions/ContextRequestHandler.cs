using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Abstractions
{
    public class ContextRequestHandler<TQuery, TResult, TContext> : IRequestHandler<TQuery, TResult> where TQuery : IRequest<TResult>
    {
        private readonly TContext context;
        public ContextRequestHandler(TContext context)
        {
            this.context = context;
        }

        protected TContext Context => context;

        public Task<TResult> Handle(TQuery request, CancellationToken cancellationToken = default)
        {
            // TODO: Logging
            return HandleRequest(request, cancellationToken);
        }

        public virtual Task<TResult> HandleRequest(TQuery request, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
