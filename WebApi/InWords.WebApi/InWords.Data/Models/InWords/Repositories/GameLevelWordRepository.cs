namespace InWords.Data.Models
{
    using System.Linq;

    public class GameLevelWordRepository : Repository<GameLevelWord>
    {
        private readonly InWordsDataContext context;
        public GameLevelWordRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
