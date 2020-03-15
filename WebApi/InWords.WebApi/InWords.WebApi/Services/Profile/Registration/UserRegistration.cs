using Grpc.Core;
using InWords.Data;
using InWords.Service.Auth.Interfaces;
using InWords.Service.Auth.Models;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email.Abstractions;
using InWords.WebApi.Services.Users.Extentions;
using InWords.WebApi.Services.Users.Models;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Registration
{
    public class UserRegistration : StructRequestHandler<RegistrationRequest, RegistrationReply, InWordsDataContext>
    {
        private readonly IEmailVerifierService emailVerifierService;
        private readonly IJwtProvider jwtProvider;
        public UserRegistration(InWordsDataContext context,
            IJwtProvider jwtProvider,
            IEmailVerifierService emailVerifierService) : base(context)
        {
            this.jwtProvider = jwtProvider;
            this.emailVerifierService = emailVerifierService;
        }

        /// <summary>
        /// Use this is to register new yousers
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <exception cref="ArgumentNullException">If request is null</exception>
        /// <exception cref="ArgumentException">If email not exist</exception>
        /// <returns></returns>
        public async override Task<RegistrationReply> HandleRequest(RequestObject<RegistrationRequest, RegistrationReply> request,
            CancellationToken cancellationToken = default)
        {

            if (request == null)
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = $"{nameof(request)} is null";
                return new RegistrationReply();
            }

            RegistrationRequest requestData = request.Value;

            if (IsAccountExist(requestData.Email))
            {
                request.StatusCode = StatusCode.AlreadyExists;
                request.Detail = "Email already exist";
                return new RegistrationReply();
            }

            // this code work in only in valid satate

            string nickname = NicknameGenerator.FromEmail(requestData.Email);

            AccountRegistration accountRegistration = new AccountRegistration(requestData.Email, requestData.Password, nickname);

            Context.Accounts.Add(accountRegistration.Account);

            await Context.SaveChangesAsync().ConfigureAwait(false);

            if (!requestData.IsAnonymous)
            {
                // send verifier email
                await emailVerifierService
                    .InstatiateVerifierMessage(accountRegistration.Account.User, accountRegistration.Account.Email)
                    .ConfigureAwait(false);
            }

            // generate tocken
            TokenResponse tokenResponse = new TokenResponse(accountRegistration.Account.AccountId, accountRegistration.Account.Role, jwtProvider);
            RegistrationReply registrationReply = new RegistrationReply
            {
                Userid = tokenResponse.UserId,
                Token = tokenResponse.Token
            };

            return registrationReply;
        }

        /// <summary>
        /// This method check if email exist
        /// </summary>
        /// <exception cref="ArgumentException">Email already exist</exception>
        /// <param name="email"></param>
        [DoesNotReturn]
        public bool IsAccountExist(string email)
        {
            return Context.Accounts.Any(a => string.Equals(a.Email, email, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
