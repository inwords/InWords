using InWords.Data.Models.InWords.Creations.GameBox;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class GameLevelRepository : Repository<GameLevel>
    {
        public GameLevelRepository(DbContext context) : base(context)
        {
        }
    }
}