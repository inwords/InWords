using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.Repositories
{
    public class UserWordPairRepository : Repository<UserWordPair>
    {
        public UserWordPairRepository(DbContext context) : base(context) { }

        public async Task<UserWordPair> Stack(UserWordPair pair)
        {
            return await Stack(pair, uwp =>
            uwp.UserID == pair.UserID
            && uwp.WordPairID == pair.WordPairID && uwp.IsInvertPair == pair.IsInvertPair);
        }
    }
}
