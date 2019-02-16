namespace InWords.Data.Models
{
    using System.Threading.Tasks;

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
