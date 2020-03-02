using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.Extentions;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.AccountUpdate
{
    public class DeleteAccount : AuthorizedRequestObjectHandler<DeleteAccountRequest, Empty, InWordsDataContext>
    {
        public DeleteAccount(InWordsDataContext context) : base(context)
        {
        }

        /// <summary>
        /// Delete account by id if exist
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <exception cref="ArgumentNullException">Account not found</exception>
        /// <returns></returns>
        public override async Task<Empty> HandleRequest(
            AuthorizedRequestObject<DeleteAccountRequest, Empty> request,
            CancellationToken cancellationToken = default)
        {
            var accountId = request.UserId;
            Account account = await Context.Accounts.FindAccount(accountId).ConfigureAwait(false);
            Context.Remove(account);
            await Context.SaveChangesAsync().ConfigureAwait(false);
            return new Empty();
        }
    }
}
