namespace InWords.Data.Models.Repositories
{
    using System.Security.Claims;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;
    using InWords.Data.Enums;
    using System;

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
            Account account = Get(x => x.Email == email && x.Password == password).Single();

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

        public async Task<Account> CreateUserAccaunt(string email, string password)
        {
            Account newAccount = new Account()
            {
                Email = email,
                Password = password,
                Role = RoleType.User,
                RegistrationDate = DateTime.Now,
                User = null
            };

            newAccount.User = new User()
            {
                NickName = "Yournick",
                Expirience = 0,
            };

            await Create(newAccount);
            //await Update(newAccount);

            return newAccount;
        }

        //todo override remove or test cascade remove
    }
}
