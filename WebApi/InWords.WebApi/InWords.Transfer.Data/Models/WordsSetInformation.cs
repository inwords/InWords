using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Transfer.Data.Models
{
    public class WordsSetInformation : SyncBase
    {
        /// <summary>
        /// int id ServerId
        /// </summary>

        public string Title { get; set; }

        public string Description { get; set; }

        public WordsSetInformation() { }

        public WordsSetInformation(SyncBase wordTranslationBase) : base(wordTranslationBase)
        {

        }

        public WordsSetInformation(WordsSetInformation wordsSetInformation) : base((wordsSetInformation as SyncBase))
        {
            Title = wordsSetInformation.Title;
            Description = wordsSetInformation.Description;
        }

    }
}
