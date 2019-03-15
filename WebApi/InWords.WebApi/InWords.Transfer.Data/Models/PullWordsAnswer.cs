using System.Collections.Generic;

namespace InWords.Transfer.Data.Models
{
    public class PullWordsAnswer
    {
        /// <summary>
        ///     List of new (added) words
        /// </summary>
        public List<WordTranslation> AddedWords;

        /// <summary>
        ///     List of old (deleted) words
        /// </summary>
        public List<int> RemovedServerIds;
    }
}