namespace InWords.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text;

    public class User
    {
        [ForeignKey("Account")]
        public int UserID { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public virtual Account Account { get; set; }
    }
}
