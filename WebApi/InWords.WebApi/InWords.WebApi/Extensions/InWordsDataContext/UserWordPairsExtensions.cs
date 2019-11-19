using System.Linq;
using InWords.Data.Domains;

namespace InWords.WebApi.Extensions.InWordsDataContext
{
    public static class UserWordPairsExtensions
    {
        public static IQueryable<UserWordPair> SelectUsersWordPairs(this IQueryable<UserWordPair> userWordPairs,int userId)
        {
            return userWordPairs.Where(uwp => uwp.UserId.Equals(userId));
        }
    }
}
