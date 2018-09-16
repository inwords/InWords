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

        [Required]
        [EmailAddress]
        [StringLength(64)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(32)] 
        public string Password { get; set; }

        [Required]
        public RoleType Role { get; set; }

        public DateTime RegistrationData { get; set; }

        public virtual User User { get; set; }
    }
}
