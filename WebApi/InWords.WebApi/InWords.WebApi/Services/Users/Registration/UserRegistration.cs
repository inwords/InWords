using InWords.Data;
using InWords.Service.Auth.Models;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email.Abstractions;
using InWords.WebApi.Services.Users.Extentions;
using InWords.WebApi.Services.Users.Models;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Registration
{
    public class UserRegistration : StructRequestHandler<RegistrationRequest, RegistrationReply, InWordsDataContext>
    {
        private readonly IEmailVerifierService emailVerifierService;

        public UserRegistration(InWordsDataContext context,
            IEmailVerifierService emailVerifierService) : base(context)
        {
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
                throw new ArgumentNullException($"{nameof(request)} is null ");

            RegistrationRequest requestData = request.Value;

            ThrowIfAlreadyExist(requestData.Email);
            
            // this code work in only in valid satate

            string nickname = NicknameGenerator.FromEmail(requestData.Email);

            AccountRegistration accountRegistration = new AccountRegistration(requestData.Email, requestData.Password, nickname);

            Context.Accounts.Add(accountRegistration.Account);

            await Context
                .SaveChangesAsync()
                .ConfigureAwait(false);

            // send verifier email
            await emailVerifierService
                .InstatiateVerifierMessage(accountRegistration.Account.User, accountRegistration.Account.Email)
                .ConfigureAwait(false);

            // generate tocken
            TokenResponse tokenResponse = new TokenResponse(accountRegistration.Account.AccountId, accountRegistration.Account.Role);
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
        public void ThrowIfAlreadyExist(string email)
        {
            bool alredyExist = Context.Accounts.Any(a => string.Equals(a.Email, email, StringComparison.InvariantCultureIgnoreCase));

            // if already exist throw custom exception
            if (alredyExist)
            {
                string? errorString = Strings.ResourceManager.GetString("Email already exist", CultureInfo.CurrentCulture);
                throw new ArgumentException(errorString);
            }
        }
    }
}
