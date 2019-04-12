using System.Collections.Generic;
using System.Linq;
using InWords.Data.Models.InWords.Domains;
using InWords.Transfer.Data.Models;

namespace InWords.WebApi.TransferData
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
    }
}