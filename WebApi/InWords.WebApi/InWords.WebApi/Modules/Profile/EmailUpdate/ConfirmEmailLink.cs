using Grpc.Core;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Localization;
using InWords.WebApi.Services.Users.Extentions;
using Org.BouncyCastle.Ocsp;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.EmailUpdate
{
    public class ConfirmEmailLink
        : StructRequestHandler<ConfirmEmailLinkRequest, ConfirmEmailReply, InWordsDataContext>
    {
        public ConfirmEmailLink(InWordsDataContext context) : base(context)
        {
        }

        public override async Task<ConfirmEmailReply> HandleRequest(
            RequestObject<ConfirmEmailLinkRequest, ConfirmEmailReply> request,
            CancellationToken cancellationToken = default)
        {
            var link = request.Value.ActivationGuid;

            if (!Guid.TryParse(link, out Guid guid))
            {
                request.StatusCode = StatusCode.InvalidArgument;
                request.Detail = Strings.GetDetailMessage(Locale.RuRu, DetailMessage.LinkInvalid);
                return new ConfirmEmailReply();
            }

            EmailVerifies linkedEmail = await Context.EmailVerifies.FindAsync(guid);

            if (linkedEmail == null) 
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = Strings.GetDetailMessage(Locale.RuRu, DetailMessage.EmailconfirmationNotfound);
                return new ConfirmEmailReply();
            }

            // set new email to account
            Account account = await Context.Accounts.FindAsync(linkedEmail.UserId).ConfigureAwait(false);
            account.Email = linkedEmail.Email;

            // delete out of dated
            var outdatedVerifies = Context.EmailVerifies.OutOfDated(guid);
            Context.RemoveRange(outdatedVerifies);

            // save changes
            await Context.SaveChangesAsync().ConfigureAwait(false);

            return new ConfirmEmailReply()
            {
                Email = account.Email
            };
        }
    }
}
