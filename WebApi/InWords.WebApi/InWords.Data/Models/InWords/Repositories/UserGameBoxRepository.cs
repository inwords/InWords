namespace InWords.Data.Models
{
    using System.Linq;

    public class UserGameBoxRepository : Repository<UserGameBox>
    {
        InWordsDataContext context = null;
        public UserGameBoxRepository(InWordsDataContext context) : base(context) { }
    }
}
