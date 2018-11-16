namespace InWords.Transfer.Data
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class WordsLevel
    {
        public int Level { get; set; }

        public List<WordTranslation> WordTranslations { get; set; }

        public void AddWords(int level, string foreignWord, string nativeWord)
        {
            Level = level;

            WordTranslations = WordTranslations ?? new List<WordTranslation>();

            WordTranslations.Add(new WordTranslation(foreignWord, nativeWord));
        }
    }
}
