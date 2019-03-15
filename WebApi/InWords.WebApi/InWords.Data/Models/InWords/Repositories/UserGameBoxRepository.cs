using InWords.Data.Models.InWords.Creations.GameBox;

namespace InWords.Data.Models.InWords.Repositories
{
    public class UserGameBoxRepository : Repository<UserGameBox>
    {
        private readonly InWordsDataContext context;

        public UserGameBoxRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}