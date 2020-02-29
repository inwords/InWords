namespace InWords.WebApi.Services.Abstractions
{
    public class StructRequestHandler<TQuery, TResult, TContext> : ContextRequestHandler<RequestObject<TQuery, TResult>, TResult, TContext>
        where TQuery : new()
        where TResult : new()
    {
        public StructRequestHandler(TContext context) : base(context)
        {

        }
    }
}
