namespace InWords.Data.Models.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class SeriaRepository : Repository<Seria>
    {
        public SeriaRepository(DbContext context) : base(context)
        {
        }
    }
}
