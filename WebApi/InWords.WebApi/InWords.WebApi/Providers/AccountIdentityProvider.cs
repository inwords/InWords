using System;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Data.Repositories;
using InWords.Service.Auth.Models;
using InWords.Service.Encryption;
using InWords.Service.Encryption.Interfaces;

namespace InWords.WebApi.Providers
{
    public class AccountIdentityProvider
    {
        private readonly UserRepository userRepository;
        private readonly AccountRepository accountRepository;
        private readonly IPasswordSalter passwordSalter;

        /// <summary>
        ///     Create provider via repository
        /// </summary>
        /// <param name="repository"></param>
        public AccountIdentityProvider(AccountRepository repository, UserRepository userRepository)
        {
            this.userRepository = userRepository;
            accountRepository = repository;
            passwordSalter = new SaltGenerator();
        }

        /// <summary>
        ///     This is to check user identity [FromBody]
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<TokenResponse> GetIdentity(BasicAuthClaims user)
        {
            return await GetIdentity(user.Email, user.Password);
        }

        /// <summary>
        ///     This is to check user identity
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task<TokenResponse> GetIdentity(string email, string password)
        {
            // find account by email
            Account account = accountRepository
                .GetWithInclude(
                x => x.Email.Equals(email) 
                && passwordSalter.EqualsSequence(password, x.Hash),
                u => u.User)
                .SingleOrDefault();

            if (account == null)
                throw new ArgumentNullException($"Access denied {email}");

            account.User.LastLogin = DateTime.UtcNow;
            await userRepository.Update(account.User);

            var response = new TokenResponse(account.AccountId, account.Role);

            return response;
        }

        public async Task<Account> CreateUserAccount(string email, string password)
        {
            byte[] saltedKey = passwordSalter.SaltPassword(password);
            var newAccount = new Account
            {
                Email = email,
                Hash = saltedKey,
                Role = RoleType.Unverified,
                RegistrationDate = DateTime.UtcNow,
                User = null
            };

            newAccount.User = new User
            {
                NickName = "User",
                Experience = 0
            };

            await accountRepository.Create(newAccount);

            return newAccount;
        }
    }
}