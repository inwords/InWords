namespace InWords.Data.Models.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Linq;

    public class UserRepository : Repository<User>
    {
        public User FindByID(User user)
        {
            return DbSet.Find(user.UserID);
        }

        public override int Count()
        {
            return new InWordsDataContext().Accounts.Count();
        }
    }
}
