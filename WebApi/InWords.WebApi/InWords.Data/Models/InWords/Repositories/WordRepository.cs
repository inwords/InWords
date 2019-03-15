namespace InWords.Data.Models
{
    using System.Threading.Tasks;

    public class WordRepository : Repository<Word>
    {
        private readonly InWordsDataContext context;

        public WordRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<Word> Stack(Word item)
        {
            item.Content = item.Content.ToLower();
            return await Stack(item, word => word.Content == item.Content);
        }
    }
}
