using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using InWords.Auth.Models;
using InWords.Data.Enums;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using InWords.Service.Encryption;
using InWords.Service.Encryption.Interfaces;

namespace InWords.WebApi.Providers
{
    public class AccountIdentityProvider
    {
        public readonly AccountRepository AccountRepository;

        private readonly IPasswordSalter passwordSalter;

        /// <summary>
        ///     Create provider via repository
        /// </summary>
        /// <param name="repository"></param>
        public AccountIdentityProvider(AccountRepository repository)
        {
            AccountRepository = repository;
            passwordSalter = new SaltGenerator();
        }

        /// <summary>
        ///     This is to check user identity [FromBody]
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public TokenResponse GetIdentity(BasicAuthClaims user)
        {
            return GetIdentity(user.Email, user.Password);
        }

        /// <summary>
        ///     This is to check user identity
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public TokenResponse GetIdentity(string email, string password)
        {
            string localEmail = email;
            Account account = AccountRepository.GetEntities(x => x.Email.Equals(localEmail)).SingleOrDefault();
            if (account == null)
                throw new ArgumentNullException($"Email not found {email}");

            bool isValidPassword = passwordSalter.EqualsSequence(password, account.Hash);

            if (!isValidPassword)
                throw new ArgumentException("Invalid password");

            string nameId = account.AccountId.ToString();
            string defaultRole = account.Role.ToString();

            IEnumerable<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, nameId),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, defaultRole)
            };

            var claimsIdentity = new ClaimsIdentity(claims);

            var response = new TokenResponse(claimsIdentity);

            return response;
        }

        public async Task<Account> CreateUserAccount(string email, string password)
        {
            byte[] saltedKey = passwordSalter.SaltPassword(password);
            var newAccount = new Account
            {
                Email = email,
                Hash = saltedKey,
                Role = RoleType.User,
                RegistrationDate = DateTime.Now,
                User = null
            };

            newAccount.User = new User
            {
                NickName = "YourNick",
                Experience = 0
            };

            await AccountRepository.Create(newAccount);
            //await Update(newAccount);

            return newAccount;
        }
    }
}