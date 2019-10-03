using InWords.Abstractions;
using InWords.Data.Creations.GameBox;

namespace InWords.Data.Repositories
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