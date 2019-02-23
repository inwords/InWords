namespace InWords.Data.Models
{
    using System.Linq;

    public class UserRepository : Repository<User>
    {
        private InWordsDataContext context = null;
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
