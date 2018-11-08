namespace InWords.WebApi.Providers
{
    using InWords.Auth;
    using InWords.Data.Enums;
    using InWords.Data.Models;
    using InWords.Data.Models.Repositories;
    using InWords.Service.Encryption;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;

    public class AccountIdentityProvider
    {
        public readonly AccountRepository accountRepository = null;

        readonly ILogger logger;
        private readonly IPasswordDerivator passwordDerivator;
        /// <summary>
        /// Create provider via repository
        /// </summary>
        /// <param name="repository"></param>
        public AccountIdentityProvider(AccountRepository repository, ILogger logger)
        {
            this.logger = logger;
            accountRepository = repository;
            passwordDerivator = new SaltManager();
        }

        /// <summary>
        /// Check identity in repository from [Request]
        /// </summary>
        /// <returns>null or ClaimsIdentity</returns>
        public ClaimsIdentity GetIdentity(HttpRequest request)
        {
            BasicAuthClaims x = request.GetBasicAuthorizationCalms();

            if (x != null)
            {
                logger.Log(LogLevel.Information, "#GetIdentity {0}", x.Email, x.Password);
                ClaimsIdentity identity = accountRepository.GetIdentity(x?.Email, x?.Password);
                return identity;
            }
            else
            {
                logger.Log(LogLevel.Error, $"Identity lost on Request {request.Headers}");
                return null;
            }
        }

        /// <summary>
        /// CheckIdentity in repository 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public ClaimsIdentity GetIdentity(string email, string password)
        {
            Account account = accountRepository.Get(x => x.Email == email).SingleOrDefault();
            if (account == null)
                throw new ArgumentNullException($"Email not found {email}");

            bool isValidPassword = passwordDerivator.EqualsSequence(password, account.Hash);

            if (!isValidPassword)
                throw new ArgumentException("Invalid password");

            IEnumerable<Claim> claims = null;

            string nameId = "-1";
            string defaultrole = RoleType.Unknown.ToString();

            if (account != null)
            {
                nameId = account.AccountID.ToString();
                email = account.Email;
                defaultrole = account.Role.ToString();
            }

            claims = new List<Claim>
            {
                    new Claim(ClaimTypes.NameIdentifier, nameId),
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, defaultrole),
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims);

            return claimsIdentity;
        }
    }
}
