using InWords.Data.Models.InWords.Creations.GameBox;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class GameBoxRepository : Repository<GameBox>
    {
        public GameBoxRepository(DbContext context) : base(context)
        {
        }
    }
}