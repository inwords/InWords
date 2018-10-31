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
            Account account = Get(x => x.Email == email && x.Password == password).FirstOrDefault();

            IEnumerable<Claim> claims = null;

            string defaultrole = email;
            string defaultname = RoleType.Unknown.ToString();
            string nameId = "-1";

            if (account != null)
            {
                defaultrole = account.AccountID.ToString();
                defaultname = account.Email;
                nameId = account.AccountID.ToString();
            }

            claims = new List<Claim>
            {
                    new Claim(ClaimsIdentity.DefaultNameClaimType,defaultname),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, defaultrole),
                    new Claim(ClaimTypes.NameIdentifier,nameId)
            };

            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
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
