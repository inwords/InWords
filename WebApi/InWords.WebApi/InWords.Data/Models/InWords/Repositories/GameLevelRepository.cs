namespace InWords.Data.Models
{
    using System.Linq;

    public class GameLevelRepository : Repository<GameLevel>
    {
        private readonly InWordsDataContext context;
        public GameLevelRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
