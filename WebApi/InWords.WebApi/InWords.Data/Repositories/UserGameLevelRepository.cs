using InWords.Data.Creations.GameBox;

namespace InWords.Data.Repositories
{
    public class UserGameLevelRepository : Repository<UserGameLevel>
    {
        public UserGameLevelRepository(InWordsDataContext context) : base(context)
        {

        }


    }
}