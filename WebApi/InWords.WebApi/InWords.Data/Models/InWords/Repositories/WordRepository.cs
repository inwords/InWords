using System.Threading.Tasks;
using InWords.Data.Models.InWords.Domains;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class WordRepository : Repository<Word>
    {
        public WordRepository(InWordsDataContext context) : base(context) { }

        public async Task<Word> Stack(Word item)
        {
            item.Content = item.Content.ToLower();
            return await Stack(item, word => word.Content == item.Content);
        }
    }
}