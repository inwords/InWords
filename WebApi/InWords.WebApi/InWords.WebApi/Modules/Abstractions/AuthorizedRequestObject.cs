using InWords.WebApi.Services.Localization;

namespace InWords.WebApi.Services.Abstractions
{
    public class AuthorizedRequestObject<TRequest, TReply> : RequestObject<TRequest, TReply>
        where TRequest : new()
        where TReply : new()
    {
        public int UserId { get; set; }
        public Locale Locale { get; set; }
        public AuthorizedRequestObject(TRequest value) : base(value)
        {
        }
    }
}
