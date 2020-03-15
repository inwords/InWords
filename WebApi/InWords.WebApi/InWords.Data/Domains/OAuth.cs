using InWords.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InWords.Data.Domains
{
    public class OAuth
    {
        [Required] [ForeignKey(nameof(Account))] public int AccountId { get; set; }
        public Account Account { get; set; }

        [Required] [MaxLength(32)] public string OpenId { get; set; }

        [MaxLength(128)] public string Email { get; set; }
        public bool EmailVerified { get; set; }
        [MaxLength(32)] public string Name { get; set; }
        [MaxLength(8)] public string Locale { get; set; }
        [MaxLength(128)] public string Picture { get; set; }
        public OAuth2Providers Provider { get; set; }
    }
}
