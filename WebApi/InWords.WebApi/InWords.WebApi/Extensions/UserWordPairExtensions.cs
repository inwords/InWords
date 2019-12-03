using System.Collections.Generic;
using System.Linq;
using InWords.Data.Domains;
using InWords.Data.DTO;
using Microsoft.EntityFrameworkCore;

namespace InWords.WebApi.Extensions
{
    public static class UserWordPairExtensions
    {
        /// <summary>
        ///     Convert UserWorkPair to WordTranslation
        /// </summary>
        /// <param name="userWordPairs"></param>
        /// <returns></returns>
        public static IEnumerable<WordTranslation> ToWordTranslations(this IEnumerable<UserWordPair> userWordPairs)
        {
            return userWordPairs.Select(ToWordTranslations).ToList();
        }

        /// <summary>
        ///     Convert UserWorkPair to WordTranslation
        /// </summary>
        /// <param name="uwp"></param>
        /// <returns></returns>
        public static WordTranslation ToWordTranslations(this UserWordPair uwp)
        {
            Word foreign = uwp.WordPair.WordForeign;
            Word native = uwp.WordPair.WordNative;

            WordTranslation addedWord = uwp.IsInvertPair
                ? new WordTranslation(native.Content, foreign.Content)
                : new WordTranslation(foreign.Content, native.Content);

            addedWord.ServerId = uwp.UserWordPairId;
            return addedWord;
        }

        public static IQueryable<UserWordPair> WereAny(this DbSet<UserWordPair> userWordPairs, IEnumerable<int> allUsersWordPairInRequest)
        {
            return userWordPairs.Where(d => allUsersWordPairInRequest.Any(m => m.Equals(d.UserWordPairId)));
        }
    }
}