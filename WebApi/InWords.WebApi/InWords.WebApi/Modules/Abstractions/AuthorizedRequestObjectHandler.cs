namespace InWords.WebApi.Services.Abstractions
{
    public class AuthReqHandler<TQuery, TResult, TContext> :
        ContextRequestHandler<AuthReq<TQuery, TResult>, TResult, TContext>
        where TQuery : new()
        where TResult : new()
    {
        public AuthReqHandler(TContext context) : base(context)
        {

        }
    }
}
