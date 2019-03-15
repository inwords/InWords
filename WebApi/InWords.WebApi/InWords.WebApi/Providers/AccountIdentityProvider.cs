﻿namespace InWords.WebApi.Providers
{
    using InWords.Auth;
    using InWords.Data.Enums;
    using InWords.Data.Models;
    using InWords.Service.Encryption;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public class AccountIdentityProvider
    {
        public readonly AccountRepository accountRepository = null;

        private readonly ILogger logger;
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
        /// This is to check user identity from [Request]
        /// </summary>
        /// <returns>null or ClaimsIdentity</returns>
        public TokenResponse GetIdentity(HttpRequest request)
        {
            BasicAuthClaims x = request.GetBasicAuthorizationCalms();

            if (x != null)
            {
                logger.Log(LogLevel.Information, "#GetIdentity {0}", x.Email, x.Password);
                TokenResponse responce = this.GetIdentity(x.Email, x.Password);
                return responce;
            }
            else
            {
                logger.Log(LogLevel.Error, $"Identity lost on Request {request.Headers}");
                return null;
            }
        }

        /// <summary>
        /// This is to check user identity [FromBody]
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public TokenResponse GetIdentity(BasicAuthClaims user)
        {
            return GetIdentity(user.Email, user.Password);
        }

        /// <summary>
        /// This is to check user identity
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public TokenResponse GetIdentity(string email, string password)
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

            nameId = account.AccountId.ToString();
            email = account.Email;
            defaultrole = account.Role.ToString();

            claims = new List<Claim>
            {
                    new Claim(ClaimTypes.NameIdentifier, nameId),
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, defaultrole),
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims);

            TokenResponse responce = new TokenResponse(claimsIdentity);

            return responce;
        }

        public async Task<Account> CreateUserAccaunt(string email, string password)
        {
            byte[] saltedkey = passwordDerivator.SaltPassword(password);
            Account newAccount = new Account()
            {
                Email = email,
                Hash = saltedkey,
                Role = RoleType.User,
                RegistrationDate = DateTime.Now,
                User = null
            };

            newAccount.User = new User()
            {
                NickName = "Yournick",
                Experience = 0,
            };

            await accountRepository.Create(newAccount);
            //await Update(newAccount);

            return newAccount;
        }
    }
}
