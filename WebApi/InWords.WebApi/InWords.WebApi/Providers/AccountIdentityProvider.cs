using InWords.Auth;
using InWords.Data.Models;
using InWords.Data.Models.Repositories;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace InWords.WebApi.Providers
{
    public class AccountIdentityProvider
    {
        public readonly AccountRepository accountRepository = null;


        /// <summary>
        /// Create provider via repository
        /// </summary>
        /// <param name="repository"></param>
        public AccountIdentityProvider(AccountRepository repository)
        {
            accountRepository = repository;
        }



        /// <summary>
        /// Check identity in repository from [Request]
        /// </summary>
        /// <returns>null or ClaimsIdentity</returns>
        public ClaimsIdentity GetIdentity(HttpRequest request)
        {
            BasicAuthClaims x = request.GetBasicAuthorizationCalms();
            ClaimsIdentity identity = accountRepository.GetIdentity(x?.Email, x?.Password);
            return identity;
        }



        /// <summary>
        /// Check identity in repository
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public ClaimsIdentity GetIdentity(Account account)
        {
            var identity = accountRepository.GetIdentity(account.Email, account.Password);
            return identity;
        }



        /// <summary>
        /// Check Identity in repository from email & password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns>null or ClaimsIdentity</returns>
        public ClaimsIdentity GetIdentity(string email, string password)
        {
            var identity = accountRepository.GetIdentity(email, password);
            return identity;
        }

    }
}
