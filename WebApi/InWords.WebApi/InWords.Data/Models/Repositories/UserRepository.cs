namespace InWords.Data.Models.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    public class UserRepository  : Repository<User>
    {
        public UserRepository(DbContext context) : base(context)
        {
        }

        public int Count()
        {
            return new InWordsDataContext().Accounts.Count();
        }
    }
}
