using InWords.Data.Models.InWords.Creations.GameBox;

namespace InWords.Data.Models.InWords.Repositories
{
    public class GameBoxRepository : Repository<GameBox>
    {
        private readonly InWordsDataContext context;
        public GameBoxRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
