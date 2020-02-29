using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.Extentions;
using ProfilePackage.V2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.EmailUpdate
{
    public class ConfirmEmail : AuthorizedRequestObjectHandler<ConfirmEmailRequest, ConfirmEmailReply, InWordsDataContext>
    {
        public ConfirmEmail(InWordsDataContext context) : base(context)
        {
        }

        public override async Task<ConfirmEmailReply> HandleRequest(
            AuthorizedRequestObject<ConfirmEmailRequest, ConfirmEmailReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException($"{nameof(request)} is null");

            var requestData = request.Value;
            var userId = request.UserId;

            // throw exception if not found
            Account account = await FindAccount(userId).ConfigureAwait(false);

            // throw exception if invalid
            EmailVerifies codeValidation = GetValidCode(requestData, userId);

            // this code executed only in valid state
            account.Email = codeValidation.Email;

            var emails = Context.EmailVerifies.OutOfDated(requestData.Code, requestData.Email, userId);
            Context.EmailVerifies.RemoveRange(emails);

            await Context.SaveChangesAsync().ConfigureAwait(false);

            ConfirmEmailReply confirmEmailReply = new ConfirmEmailReply
            {
                Email = codeValidation.Email
            };

            return confirmEmailReply;
        }

        private EmailVerifies GetValidCode(ConfirmEmailRequest requestData, int userId)
        {
            var codeValidation = Context
                .EmailVerifies
                .Where(e => e.UserId == userId
                && e.Code == requestData.Code
                && e.Email == requestData.Email)
                .SingleOrDefault();
            if (codeValidation == default)
            {
                throw new ArgumentNullException($"{nameof(codeValidation)} is incorrect");
            }

            return codeValidation;
        }

        private async Task<Account> FindAccount(int userId)
        {
            Account account = await Context.Accounts.FindAsync(userId);
            if (account == default)
            {
                throw new ArgumentNullException($"{nameof(account)} is not found");
            }

            return account;
        }
    }
}
