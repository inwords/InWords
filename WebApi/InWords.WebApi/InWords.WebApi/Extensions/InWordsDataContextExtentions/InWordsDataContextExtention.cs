using InWords.Data;
using InWords.Data.Domains;
using System;
using System.Linq;

namespace InWords.WebApi.Extensions.InWordsDataContextExtention
{
    public static class InWordsDataContextExtention
    {
        public static IQueryable<UserWordPair> CurrentUserWordPairs(this InWordsDataContext context, int userid)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            return context.UserWordPairs.Where(u => u.UserId == userid);
        }
    }
}
