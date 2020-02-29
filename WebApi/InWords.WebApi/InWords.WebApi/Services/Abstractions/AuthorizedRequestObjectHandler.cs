namespace InWords.WebApi.Services.Abstractions
{
    public class AuthorizedRequestObjectHandler<TQuery, TResult, TContext> :
        ContextRequestHandler<AuthorizedRequestObject<TQuery, TResult>, TResult, TContext>
        where TQuery : new()
        where TResult : new()
    {
        public AuthorizedRequestObjectHandler(TContext context) : base(context)
        {

        }
    }
}
