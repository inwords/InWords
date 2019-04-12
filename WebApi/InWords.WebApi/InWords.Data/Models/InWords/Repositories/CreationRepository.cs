using InWords.Data.Models.InWords.Creations;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class CreationRepository : Repository<Creation>
    {
        public CreationRepository(DbContext context) : base(context)
        {
        }
    }
}