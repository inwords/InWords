using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using MediatR;

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

        public virtual Task<TResult> Handle(TQuery request, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
