using InWords.Data.Models.InWords.Creations.GameBox;

namespace InWords.Data.Models.InWords.Repositories
{
    public class UserGameLevelRepository : Repository<UserGameLevel>
    {
        public UserGameLevelRepository(InWordsDataContext context) : base(context) { }
    }
}
