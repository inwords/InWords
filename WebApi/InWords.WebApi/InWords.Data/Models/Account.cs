using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace InWords.Data.Models
{
    public class Account
    {
        public int AccountID { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public virtual User User { get; set; }
    }
}
