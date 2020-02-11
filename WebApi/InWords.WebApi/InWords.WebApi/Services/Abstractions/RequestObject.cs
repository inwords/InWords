using MediatR;

namespace InWords.WebApi.Services.Abstractions
{
    public abstract class RequestObject<TRequest, TReply> : IRequest<TReply> where TRequest : class where TReply : class
    {
        public TRequest Value { get; set; }
        public RequestObject(TRequest value)
        {
            this.Value = value;
        }
    }
}
