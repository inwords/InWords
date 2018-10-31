namespace InWords.Data.Models.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Text;
    public class SeriaWordRepository : Repository<SeriaWord>
    {
        public SeriaWordRepository(DbContext context) : base(context)
        {

        }
    }
}
