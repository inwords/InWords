using Registration.V2;
using InWords.Data;
using InWords.WebApi.Services.Abstractions;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Globalization;
using System.Diagnostics.CodeAnalysis;
using System.Resources;
using System.Reflection;
using InWords.WebApi.Services.Email;
using InWords.Service.Auth.Models;

namespace InWords.WebApi.Services.Users.Registration
{
    public class UserRegistration : StructRequestHandler<RegistrationRequest, RegistrationReply, InWordsDataContext>
    {
        private readonly EmailVerifierService emailVerifierService;

        public UserRegistration(InWordsDataContext context,
            EmailVerifierService emailVerifierService) : base(context)
        {
            this.emailVerifierService = emailVerifierService;
        }

        public async override Task<RegistrationReply> HandleRequest(RequestObject<RegistrationRequest, RegistrationReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException($"{nameof(request)} is null ");

            RegistrationRequest requestData = request.Value;

            bool alredyExist = Context.Accounts.Any(a => string.Equals(a.Email, requestData.Email, StringComparison.InvariantCultureIgnoreCase));

            string? errorString = Strings.ResourceManager.GetString("Email already exist", CultureInfo.CurrentCulture);

            // if already exist throw custom exception
            if (alredyExist)
                throw new ArgumentException(errorString);

            // if email is free register user

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
    }
}
