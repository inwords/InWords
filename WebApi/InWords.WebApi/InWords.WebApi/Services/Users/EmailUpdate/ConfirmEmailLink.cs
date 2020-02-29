using InWords.Data;
using InWords.WebApi.Services.Abstractions;
using ProfilePackage.V2;

namespace InWords.WebApi.Services.Users.EmailUpdate
{
    public class ConfirmEmailLink
        : AuthorizedRequestObjectHandler<ConfirmEmailRequest, ConfirmEmailReply, InWordsDataContext>
    {
        public ConfirmEmailLink(InWordsDataContext context) : base(context)
        {
        }


    }
}
