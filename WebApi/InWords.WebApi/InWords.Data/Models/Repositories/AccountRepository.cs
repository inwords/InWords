using System;
using System.Text;

namespace InWords.Data.Models.Repositories
{
    using System.Security.Claims;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    public class AccountRepository : Repository<Account>
    {
        public AccountRepository(DbContext context) : base(context) { }

        /// <summary>
        /// Get identity from database
        /// Email as Name & Id as NameIdentifier
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password">raw password</param>
        /// <returns></returns>
        public ClaimsIdentity GetIdentity(string email, string password)
        {
            Account account = Get().FirstOrDefault(x => x.Email == email && x.Password == password);
            if (account != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, account.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, account.Role.ToString()),
                    new Claim(ClaimTypes.NameIdentifier,account.AccountID.ToString())
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

        //todo override remove or test cascade remove
    }
}
