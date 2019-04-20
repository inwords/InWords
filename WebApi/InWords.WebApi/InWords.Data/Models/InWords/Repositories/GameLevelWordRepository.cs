using InWords.Data.Models.InWords.Creations.GameBox;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class GameLevelWordRepository : Repository<GameLevelWord>
    {
        public GameLevelWordRepository(InWordsDataContext context) : base(context)
        {
        }
    }
}