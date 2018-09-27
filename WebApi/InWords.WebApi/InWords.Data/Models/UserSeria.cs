namespace InWords.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class UserSeria
    {
        public int UserSeriaID { get; set; }

        [StringLength(32)]
        public virtual Seria Seria { get; set; }

        public virtual User User { get; set; }
    }
}
