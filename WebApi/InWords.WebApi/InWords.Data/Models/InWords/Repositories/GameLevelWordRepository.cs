using InWords.Data.Models.InWords.Creations.GameBox;

namespace InWords.Data.Models.InWords.Repositories
{
    public class GameLevelWordRepository : Repository<GameLevelWord>
    {
        private readonly InWordsDataContext context;
        public GameLevelWordRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
