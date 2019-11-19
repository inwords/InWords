using System.Linq;
using System.Threading.Tasks;
using InWords.Common;
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

        public async Task<WordPair> Stack(Word wordForeign, Word wordNative)
        {
            wordForeign = await wordRepository.Stack(wordForeign);
            wordNative = await wordRepository.Stack(wordNative);
            var result = new WordPair
            {
                WordForeignId = wordForeign.WordId,
                WordNativeId = wordNative.WordId
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