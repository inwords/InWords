using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Transfer.Data.Models
{
    public class WordsSetInformation : WordTranslationBase
    {
        /// <summary>
        /// int id ServerId
        /// </summary>

        public string Title { get; set; }

        public string Description { get; set; }

        public WordsSetInformation() { }

        public WordsSetInformation(WordTranslationBase wordTranslationBase) : base(wordTranslationBase)
        {

        }

        public WordsSetInformation(WordsSetInformation wordsSetInformation) : base((wordsSetInformation as WordTranslationBase))
        {
            Title = wordsSetInformation.Title;
            Description = wordsSetInformation.Description;
        }

    }
}
