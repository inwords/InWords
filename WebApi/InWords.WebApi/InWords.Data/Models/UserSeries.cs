namespace InWords.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class UserSeria
    {
        public int UserSeriesID { get; set; }

        public virtual Seria Seria { get; set; }

        public virtual User User { get; set; }
    }
}
