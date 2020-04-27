﻿using InWords.Common;
using InWords.Data.Domains;
using System.Threading.Tasks;

namespace InWords.Data.Repositories
{
    public class WordRepository : Repository<Word>
    {
        public WordRepository(InWordsDataContext context) : base(context)
        {
        }

        public async Task<Word> Stack(Word item)
        {
            item.Content = item.Content.ToLower();
            return await Stack(item, word => word.Content == item.Content);
        }
    }
}