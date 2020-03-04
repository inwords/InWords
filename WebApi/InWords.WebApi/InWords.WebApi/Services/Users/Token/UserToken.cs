using InWords.Data;
using InWords.Service.Auth.Models;
using InWords.Service.Encryption.Interfaces;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Token
{
    public class UserToken : StructRequestHandler<TokenRequest, TokenReply, InWordsDataContext>
    {
        private readonly IPasswordSalter passwordSalter;
        public UserToken(InWordsDataContext context, IPasswordSalter passwordSalter) : base(context)
        {
            this.passwordSalter = passwordSalter;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <exception cref="ArgumentNullException">Account not found</exception>
        /// <exception cref="ArgumentException">Password not match</exception>
        /// <returns></returns>
        public override Task<TokenReply> HandleRequest(RequestObject<TokenRequest, TokenReply> request,
            CancellationToken cancellationToken = default)
        {
            return Task.Run(() =>
            {
                TokenRequest tokenRequest = request.Value;
                // check username and password
                var requestedAccount = Context
                    .Accounts
                    .Where(a => a.Email.Equals(tokenRequest.Email, StringComparison.InvariantCultureIgnoreCase))
                    .Select(c => new { c.AccountId, c.Role, c.Hash })
                    .SingleOrDefault();

                if (requestedAccount == null)
                    throw new ArgumentNullException($"{nameof(requestedAccount)} is null");

                if (!passwordSalter.EqualsSequence(tokenRequest.Password, requestedAccount.Hash))
                    throw new ArgumentException($"{nameof(tokenRequest.Password)} is not match");

                TokenResponse tokenResponce = new TokenResponse(requestedAccount.AccountId, requestedAccount.Role);

                TokenReply tokenReply = new TokenReply()
                {
                    UserId = tokenResponce.UserId,
                    Token = tokenResponce.Token
                };

                return tokenReply;
            });
        }
    }
}
