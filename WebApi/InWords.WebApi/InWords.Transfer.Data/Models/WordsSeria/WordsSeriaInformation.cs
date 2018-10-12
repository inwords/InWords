using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Transfer.Data.Models
{
    public class WordsSeriaInformation : SyncBase
    {
        /// <summary>
        /// int id ServerId
        /// </summary>

        public string Title { get; set; }

        public string Description { get; set; }

        public WordsSeriaInformation() { }

        public WordsSeriaInformation(SyncBase wordTranslationBase) : base(wordTranslationBase)
        {

        }

        public WordsSeriaInformation(WordsSeriaInformation wordsSetInformation) : base((wordsSetInformation as SyncBase))
        {
            Title = wordsSetInformation.Title;
            Description = wordsSetInformation.Description;
        }

    }
}
