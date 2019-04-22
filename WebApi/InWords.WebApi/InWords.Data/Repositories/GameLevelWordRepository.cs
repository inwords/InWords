using InWords.Data.Creations.GameBox;

namespace InWords.Data.Repositories
{
    public class GameLevelWordRepository : Repository<GameLevelWord>
    {
        public GameLevelWordRepository(InWordsDataContext context) : base(context)
        {
        }
    }
}