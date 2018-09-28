namespace InWords.Data.Models.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using Microsoft.EntityFrameworkCore;

    public class WordPairRepository : Repository<WordPair>
    {
        public WordPairRepository(DbContext context) : base(context)
        {
        }
    }
}
