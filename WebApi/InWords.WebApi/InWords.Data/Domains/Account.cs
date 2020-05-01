using InWords.Data.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace InWords.Data.Domains
{
    public class Account
    {
        [Key] public int AccountId { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(64)]
        public string Email { get; set; }

        [Required] [MaxLength(128)] public byte[] Hash { get; set; }

        [Required] public RoleType Role { get; set; }

        [Required] public DateTime RegistrationDate { get; set; }

        [Required] public virtual User User { get; set; }
    }
}