using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.Repositories
{
    public class UserWordPairRepository : Repository<UserWordPair>
    {
        public UserWordPairRepository(DbContext context) : base(context) {  }


    }
}
