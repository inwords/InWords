using InWords.Data.Creations.GameBox;

namespace InWords.Data.Repositories
{
    public class GameLevelRepository : Repository<GameLevel>
    {
        public GameLevelRepository(InWordsDataContext context) : base(context)
        {

        }
    }
}