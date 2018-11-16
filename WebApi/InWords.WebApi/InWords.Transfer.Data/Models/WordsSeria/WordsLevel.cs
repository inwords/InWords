namespace InWords.Transfer.Data
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class WordsLevel
    {
        public int Level { get; set; }

        public List<WordTranslation> WordTranslations { get; set; }

        public void AddWords(string foreignWord, string nativeWord)
        {
            WordTranslations = WordTranslations ?? new List<WordTranslation>();

            WordTranslations.Add(new WordTranslation(foreignWord, nativeWord));
        }
    }
}
