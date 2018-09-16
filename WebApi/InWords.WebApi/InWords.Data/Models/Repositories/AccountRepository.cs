using System;
using System.Text;

namespace InWords.Data.Models.Repositories
{
    using System.Security.Claims;
    using System.Collections.Generic;
    using System.Linq;

    public class AccountRepository : Repository<Account>
    {
        public ClaimsIdentity GetIdentity(string email, string password)
        {
            Account account = DbSet.FirstOrDefault(x => x.Email == email && x.Password == password);
            if (account != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, account.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, account.Role.ToString())
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
