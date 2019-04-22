using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;

namespace InWords.Data.Repositories
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

        public IQueryable<WordPair> IncludeContent()
        {
            return GetWithInclude(wf => wf.WordForeign,
                wn => wn.WordNative).AsQueryable();
        }
    }
}