using Grpc.Core;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.AccountUpdate
{
    public class DeleteAccount : AuthReqHandler<DeleteAccountRequest, Empty, InWordsDataContext>
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
            AuthReq<DeleteAccountRequest, Empty> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var accountId = request.UserId;
            Account account = await Context.Accounts.FindAsync(accountId).ConfigureAwait(false);
            if (account == default)
            {
                request.StatusCode = StatusCode.NotFound;
            }
            else
            {
                Context.Remove(account);
                await Context.SaveChangesAsync().ConfigureAwait(false);
            }
            return new Empty();
        }
    }
}
