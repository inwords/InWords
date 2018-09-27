namespace InWords.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class WordPair
    {
        public int WordPairID { get; set; }

        public virtual Word Word1 { get; set; }

        public virtual Word Word2 { get; set; }

        public int Rating { get; set; }
    }
}
