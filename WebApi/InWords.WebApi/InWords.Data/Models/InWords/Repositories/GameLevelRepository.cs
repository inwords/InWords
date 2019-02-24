namespace InWords.Data.Models
{
    using System.Linq;

    public class GameLevelRepository : Repository<GameLevel>
    {
        InWordsDataContext context = null;
        public GameLevelRepository(InWordsDataContext context) : base(context) { }
    }
}
