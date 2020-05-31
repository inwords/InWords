using InWords.WebApi.Services.Localization;

namespace InWords.WebApi.Services.Abstractions
{
    public class AuthReq<TRequest, TReply> : RequestObject<TRequest, TReply>
        where TRequest : new()
        where TReply : new()
    {
        public int UserId { get; set; }
        public Locale Locale { get; set; }
        public AuthReq(TRequest value) : base(value)
        {
        }
    }
}
