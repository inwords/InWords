namespace InWords.Data.Models
{
    using System.Threading.Tasks;

    public class UserWordPairRepository : Repository<UserWordPair>
    {
        public UserWordPairRepository(InWordsDataContext context) : base(context) { }

        public async Task<UserWordPair> Stack(UserWordPair pair)
        {
            return await Stack(pair, uwp =>
            uwp.UserId == pair.UserId
            && uwp.WordPairId == pair.WordPairId && uwp.IsInvertPair == pair.IsInvertPair);
        }
    }
}
