using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace InWords.Data.Models.Repositories
{
    public class WordRepository : Repository<Word>
    {
        public WordRepository(DbContext context) : base(context)
        {

        }

        public async Task<Word> Stack(Word item)
        {
            return await Stack(item, word => word.Content == item.Content);
        }
    }
}
