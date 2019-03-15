namespace InWords.Data.Models
{
    using System.Linq;

    public class GameBoxRepository : Repository<GameBox>
    {
        private readonly InWordsDataContext context;
        public GameBoxRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
