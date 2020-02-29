using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.Extentions;
using ProfilePackage.V2;
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
                throw new ArgumentException($"{nameof(link)} is invalid");

            EmailVerifies linkedEmail = await Context.EmailVerifies.FindAsync(guid);

            if (linkedEmail == null)
                throw new ArgumentNullException($"{nameof(linkedEmail)} not found");

            // set new email to account
            Account account = await Context.Accounts.FindAccount(linkedEmail.UserId).ConfigureAwait(false);
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
