using System.Linq;
using InWords.Common;
using InWords.Data.Domains;

namespace InWords.Data.Repositories
{
    public class UserRepository : Repository<User>
    {
        private readonly InWordsDataContext context;

        public UserRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }

        public User GetUserAccount(int key)
        {
            User user = GetWithInclude(u => u.UserId.Equals(key), us => us.Account).SingleOrDefault();

            if (user is null) return null;

            user.Account.Hash = null;
            user.Account.Email = EmailHider.Hide(user.Account.Email);
            user.Account.User = null;
            return user;
        }

        public int Count()
        {
            return context.Accounts.Count();
        }
    }
}