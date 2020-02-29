using InWords.Data.Domains;
using System.Linq;

namespace InWords.WebApi.Extensions.InWordsDataContext
{
    public static class UserWordPairsExtensions
    {
        public static IQueryable<UserWordPair> SelectUsersWordPairs(this IQueryable<UserWordPair> userWordPairs, int userId)
        {
            return userWordPairs.Where(uwp => uwp.UserId.Equals(userId));
        }
    }
}
