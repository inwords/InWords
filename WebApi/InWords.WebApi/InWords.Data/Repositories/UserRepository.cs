using System.Linq;
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

        public int Count()
        {
            return context.Accounts.Count();
        }
    }
}