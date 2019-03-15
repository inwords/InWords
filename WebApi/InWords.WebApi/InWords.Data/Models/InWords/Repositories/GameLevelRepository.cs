using InWords.Data.Models.InWords.Creations.GameBox;

namespace InWords.Data.Models.InWords.Repositories
{
    public class GameLevelRepository : Repository<GameLevel>
    {
        private readonly InWordsDataContext context;

        public GameLevelRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}