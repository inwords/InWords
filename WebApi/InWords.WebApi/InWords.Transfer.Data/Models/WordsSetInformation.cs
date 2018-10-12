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
    }
}
