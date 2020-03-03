using InWords.Data.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Extentions
{
    public static class AccountsExtentions
    {
        /// <summary>
        /// Return account if exists, else throw exception 
        /// </summary>
        /// <param name="accounts"></param>
        /// <param name="userId"></param>
        /// <exception cref="ArgumentNullException">Account is not found</exception>
        /// <returns></returns>
        public static async Task<Account> FindAccount(this DbSet<Account> accounts, object userId)
        {
            Account account = await accounts.FindAsync(userId);
            if (account == default)
            {
                throw new ArgumentNullException($"{nameof(account)} is not found");
            }
            return account;
        }
    }
}
