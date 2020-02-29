using InWords.Data.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Extentions
{
    public static class AccountsExtentions
    {
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
