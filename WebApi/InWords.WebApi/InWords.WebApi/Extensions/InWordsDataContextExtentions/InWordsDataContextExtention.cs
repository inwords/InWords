using InWords.Data;
using InWords.Data.Domains;
using Org.BouncyCastle.Bcpg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
