using InWords.Data.Domains;
using InWords.Data.DTO;
using System.Collections.Generic;
using System.Linq;

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

        public static IQueryable<UserWordPair> WhereAny(this IQueryable<UserWordPair> userWordPairs, IEnumerable<int> allUsersWordPairInRequest)
        {
            return userWordPairs.Where(d => allUsersWordPairInRequest.Any(m => m.Equals(d.UserWordPairId)));
        }
    }
}