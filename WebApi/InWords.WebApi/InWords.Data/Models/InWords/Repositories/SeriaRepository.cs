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
    }
}
