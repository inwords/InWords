using InWords.Data.Enums;
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
        [StringLength(64)]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [StringLength(32)] 
        public string Password { get; set; }

        public RoleType Role { get; set; }

        public virtual User User { get; set; }
    }
}
