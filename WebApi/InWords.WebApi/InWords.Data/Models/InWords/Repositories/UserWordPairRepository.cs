namespace InWords.Data.Models
{
    using System.Threading.Tasks;

    public class UserWordPairRepository : Repository<UserWordPair>
    {
        public UserWordPairRepository(InWordsDataContext context) : base(context) { }

        public async Task<UserWordPair> Stack(UserWordPair pair)
        {
            return await Stack(pair, uwp =>
            uwp.UserID == pair.UserID
            && uwp.WordPairID == pair.WordPairID && uwp.IsInvertPair == pair.IsInvertPair);
        }
    }
}
