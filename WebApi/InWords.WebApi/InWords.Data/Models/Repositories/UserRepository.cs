using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Data.Models.Repositories
{
    public class UserRepository : Repository<User>
    {
        public User FindByID(User user)
        {
            return DbSet.Find(user.UserId);
        }
    }
}
