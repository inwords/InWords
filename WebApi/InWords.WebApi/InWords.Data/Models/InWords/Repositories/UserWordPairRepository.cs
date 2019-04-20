using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models.InWords.Domains;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class UserWordPairRepository : Repository<UserWordPair>
    {
        public UserWordPairRepository(InWordsDataContext context) : base(context) { }

        public async Task<UserWordPair> Stack(UserWordPair pair)
        {
            return await Stack(pair, uwp =>
                uwp.UserId == pair.UserId
                && uwp.WordPairId == pair.WordPairId && uwp.IsInvertPair == pair.IsInvertPair);
        }

        public IQueryable<UserWordPair> IncludeWordPairs()
        {
            return GetWithInclude(wf => wf.WordPair.WordForeign,
                wn => wn.WordPair.WordNative).AsQueryable();
        }
    }
}