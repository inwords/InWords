using InWords.Data.Domains;
using InWords.Data.Repositories;
using InWords.Service.Auth.Models;
using InWords.Service.Encryption;
using InWords.Service.Encryption.Interfaces;
using InWords.WebApi.Services.Users;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Providers
{
    [Obsolete]
    public class AccountIdentityProvider
    {
        private readonly AccountRepository accountRepository;
        private readonly IPasswordSalter passwordSalter;
        private readonly UserRepository userRepository;

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
        /// <exception cref="ArgumentException"></exception>
        /// <returns></returns>
        public Task<TokenResponse> GetIdentity(BasicAuthClaims user)
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
        public Task<TokenResponse> GetIdentity(string email, string password)
        {
            // find account by email
            Account account = accountRepository
                .GetWithInclude(
                    x => x.Email.Equals(email)
                         && passwordSalter.EqualsSequence(password, x.Hash),
                    u => u.User)
                .SingleOrDefault();

            return GetIdentity(account);
        }

        /// <summary>
        /// </summary>
        /// <param name="account"></param>
        /// <exception cref="ArgumentException"></exception>
        /// <returns></returns>
        public async Task<TokenResponse> GetIdentity(Account account)
        {
            if (account == null)
                throw new ArgumentNullException("Access denied, Account is null");
            if (account.Email == null)
                throw new ArgumentNullException("Access denied, Email is null");

            account.User.LastLogin = DateTime.UtcNow;

            await userRepository.Update(account.User)
                .ConfigureAwait(false);

            var response = new TokenResponse(account.AccountId, account.Role);

            return response;
        }

        public async Task<Account> CreateUserAccount(string email, string password, string nickName = "")
        {
            AccountRegistration accountRegistration = new AccountRegistration(email, password, nickName);

            Account registredAccount = await accountRepository.CreateAsync(accountRegistration.Account);

            return registredAccount;
        }
    }
}