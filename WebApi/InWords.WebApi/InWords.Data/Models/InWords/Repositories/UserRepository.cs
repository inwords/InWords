using System.Linq;
using InWords.Data.Models.InWords.Domains;

namespace InWords.Data.Models.InWords.Repositories
{
    public class UserRepository : Repository<User>
    {
        private readonly InWordsDataContext context = null;
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
