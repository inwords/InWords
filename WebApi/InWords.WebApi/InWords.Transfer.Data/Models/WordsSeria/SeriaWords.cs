namespace InWords.Transfer.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// This is the list of words without a description of the series
    /// //todo add discription or more classes
    /// </summary>
    public class SeriaWords : SyncBase
    {
        public List<WordsLevel> WordsLevels { get; set; }

        public void Add(int level, string wordForeign, string wordsNative)
        {
            var wordsLevel = WordsLevels.Where(w => w.Level == level).SingleOrDefault();

            wordsLevel = wordsLevel ?? new WordsLevel();

            wordsLevel.AddWords(wordForeign, wordsNative);

            WordsLevels.Add(wordsLevel);
        }
    }
}