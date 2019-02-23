namespace InWords.Data.Models
{
    using System.Linq;

    public class GameLevelWordRepository : Repository<GameLevelWord>
    {
        InWordsDataContext context = null;
        public GameLevelWordRepository(InWordsDataContext context) : base(context) { }
    }
}
