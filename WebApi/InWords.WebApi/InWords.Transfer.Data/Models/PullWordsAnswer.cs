using System.Collections.Generic;

namespace InWords.Transfer.Data.Models
{
    public class PullWordsAnswer
    {
        /// <summary>
        ///     List of new (added) words
        /// </summary>
        public IEnumerable<WordTranslation> AddedWords;

        /// <summary>
        ///     List of old (deleted) words
        /// </summary>
        public IEnumerable<int> RemovedServerIds;
    }
}