using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Transfer.Data
{
    /// <summary>
    /// Transfer response pack: Id and ServerId
    /// </summary>
    public class WordTranslationBase
    {
        public int Id { get; set; }

        public int ServerId { get; set; }
    }
}
