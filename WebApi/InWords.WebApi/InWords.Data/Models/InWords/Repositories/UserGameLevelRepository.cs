namespace InWords.Data.Models
{
    using System.Linq;

    public class UserGameLevelRepository : Repository<UserGameLevel>
    {
        InWordsDataContext context = null;
        public UserGameLevelRepository(InWordsDataContext context) : base(context) { };
    }
}
