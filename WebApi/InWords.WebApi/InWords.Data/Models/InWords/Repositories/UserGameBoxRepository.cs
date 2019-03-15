namespace InWords.Data.Models
{
    using System.Linq;

    public class UserGameBoxRepository : Repository<UserGameBox>
    {
        private readonly InWordsDataContext context;
        public UserGameBoxRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
