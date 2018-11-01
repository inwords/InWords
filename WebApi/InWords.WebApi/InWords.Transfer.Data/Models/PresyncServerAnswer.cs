namespace InWords.Transfer.Data
{
    using System.Collections.Generic;

    public class PullWordsAnswer
    {
        /// <summary>
        /// List of old (deleted) words
        /// </summary>
        public List<int> RemovedServerIds;

        /// <summary>
        /// List of new (added) words
        /// </summary>
        public List<WordTranslation> AddedWords;
    }
}
