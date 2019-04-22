using InWords.Data.Creations.GameBox;

namespace InWords.Data.Repositories
{
    public class UserGameBoxRepository : Repository<UserGameBox>
    {
        public UserGameBoxRepository(InWordsDataContext context) : base(context)
        {
        }
    }
}