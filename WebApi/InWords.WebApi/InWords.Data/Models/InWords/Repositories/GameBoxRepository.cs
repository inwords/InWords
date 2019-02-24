namespace InWords.Data.Models
{
    using System.Linq;

    public class GameBoxRepository : Repository<GameBox>
    {
        InWordsDataContext context = null;
        public GameBoxRepository(InWordsDataContext context) : base(context) { }
    }
}
