using InWords.Common;
using InWords.Data.Domains;
using System.Threading.Tasks;

namespace InWords.Data.Repositories
{
    public class UserWordPairRepository : Repository<UserWordPair>
    {
        public UserWordPairRepository(InWordsDataContext context) : base(context)
        {
        }

        public async Task<UserWordPair> Stack(UserWordPair pair)
        {
            return await Stack(pair, uwp =>
                uwp.UserId == pair.UserId
                && uwp.WordPairId == pair.WordPairId && uwp.IsInvertPair == pair.IsInvertPair);
        }
    }
}