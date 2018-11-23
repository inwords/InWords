namespace InWords.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class SeriaRepository : Repository<Seria>
    {
        public SeriaRepository(InWordsDataContext context) : base(context)
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
