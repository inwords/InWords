namespace InWords.Data.Models.Repositories
{
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    public class UserRepository : Repository<User>
    {
        InWordsDataContext context;
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
