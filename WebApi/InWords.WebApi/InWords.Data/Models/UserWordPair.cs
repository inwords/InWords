using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Data.Models
{
    public class UserWordPair
    {
        public int UserWordPairID { get; set; }

        public virtual WordPair WordPair { get; set; }
    }
}
