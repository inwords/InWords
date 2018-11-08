namespace InWords.Data.Models.Repositories
{
    using System.Security.Claims;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;
    using InWords.Data.Enums;
    using System;
    using InWords.Service.Encryption;

    public class AccountRepository : Repository<Account>
    {
        private readonly IPasswordDerivator passwordDerivator;

        public AccountRepository(DbContext context) : base(context)
        {
            passwordDerivator = new SaltManager();
        }

        public async Task<Account> CreateUserAccaunt(string email, string password)
        {
            byte[] saltedkey = passwordDerivator.SaltPassword(password);

            Account newAccount = new Account()
            {
                Email = email,
                Hash = saltedkey,
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

        //todo cascade account removing
    }
}
