namespace InWords.Data.Models.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class SeriaRepository : Repository<Seria>
    {
        public SeriaRepository(DbContext context) : base(context)
        {

        }

        public List<Seria> GetInclude(Func<Seria, bool> predicate = null)
        {
            var seria = dbSet
                .Include(s => s.Creator)
                .Include(s => s.SeriaDescriptions).AsQueryable();

            if (predicate != null)
            {
                seria = seria.Where(predicate).AsQueryable();
            }

            return seria.ToList();
        }
    }
}
