using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.Service.Auth.Interfaces;
using InWords.Service.Auth.Models;
using InWords.Service.Encryption.Interfaces;
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
        private readonly IJwtProvider jwtProvider;
        public UserToken(InWordsDataContext context, IJwtProvider jwtProvider, IPasswordSalter passwordSalter) : base(context)
        {
            this.jwtProvider = jwtProvider;
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
                    .Where(a => a.Email.ToLower() == tokenRequest.Email.ToLower())
                    .Select(c => new { c.AccountId, c.Role, c.Hash })
                    .SingleOrDefault();

                if (requestedAccount == null || !passwordSalter.EqualsSequence(tokenRequest.Password, requestedAccount.Hash))
                {
                    request.StatusCode = StatusCode.NotFound;
                    request.Detail = $"{nameof(tokenRequest.Password)} is not match";
                    return new TokenReply();
                }

                TokenResponse tokenResponce = new TokenResponse(requestedAccount.AccountId, requestedAccount.Role, jwtProvider);

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
