using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Data.Models
{
    public class Word
    {
        public int WordID { get; set; }

        public string Content { get; set; }

        public virtual Language Language { get; set; }
    }
}
