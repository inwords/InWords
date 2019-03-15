﻿namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User
    {
        [ForeignKey("Account")]
        public int UserId { get; set; }

        [StringLength(32)]
        public string NickName { get; set; }

        public string AvatarPath { get; set; }
        
        public int Experience { get; set; }

        public virtual Account Account { get; set; }
    }
}
