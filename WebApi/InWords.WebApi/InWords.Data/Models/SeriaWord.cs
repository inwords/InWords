
namespace InWords.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class SeriaWord
    {
        public int SeriaWordID { get; set; }

        public virtual WordPair WordPair { get; set; }

        public virtual Seria Seria { get; set; }
    }
}
