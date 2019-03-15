using System.Threading.Tasks;
using InWords.Data.Models.InWords.Domains;

namespace InWords.Data.Models.InWords.Repositories
{
    public class WordPairRepository : Repository<WordPair>
    {
        private readonly WordRepository wordRepository;

        public WordPairRepository(InWordsDataContext context) : base(context)
        {
            wordRepository = new WordRepository(context);
        }

        public async Task<WordPair> Stack(Word first, Word second)
        {
            first = await wordRepository.Stack(first);
            second = await wordRepository.Stack(second);
            var result = new WordPair
            {
                WordForeignId = first.WordId,
                WordNativeId = second.WordId
            };

            return await Stack(result);
        }

        public async Task<WordPair> Stack(WordPair pair)
        {
            return await Stack(pair, words =>
                words.WordForeignId == pair.WordForeignId
                && words.WordNativeId == pair.WordNativeId
                || words.WordForeignId == pair.WordNativeId
                && words.WordNativeId == pair.WordForeignId
            );
        }
    }
}