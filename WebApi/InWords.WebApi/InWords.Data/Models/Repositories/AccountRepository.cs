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

        public AccountRepository(DbContext context) : base(context)
        {

        }
        //todo cascade account removing
    }
}
