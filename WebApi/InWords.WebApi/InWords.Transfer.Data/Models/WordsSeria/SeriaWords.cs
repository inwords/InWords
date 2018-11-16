namespace InWords.Transfer.Data
{
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// This is the list of words
    /// //todo add discription or more classes
    /// </summary>
    public class WordsSet : SyncBase
    {
        public List<WordsLevel> WordsLevels { get; set; }

        public void Add(int level, string wordForeign, string wordsNative)
        {
            var wordsLevel = WordsLevels.Where(w => w.Level == level).SingleOrDefault();

            if (wordsLevel == null)
            {
                wordsLevel = new WordsLevel();

                wordsLevel.AddWords(wordForeign, wordsNative);

                WordsLevels.Add(wordsLevel);
            }
            else
            {
                wordsLevel.AddWords(wordForeign, wordsNative);
            }
        }

        #region ctor
        /// <summary>
        /// This is default constructor
        /// </summary>
        public WordsSet()
        {
            WordsLevels = new List<WordsLevel>(0);
        }
        #endregion
    }
}