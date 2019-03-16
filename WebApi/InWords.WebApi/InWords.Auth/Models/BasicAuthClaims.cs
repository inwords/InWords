using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InWords.Auth.Models
{
    /// <summary>
    ///     Email and Password
    ///     data transfer class
    /// </summary>
    public class BasicAuthClaims
    {
        public BasicAuthClaims()
        {
        }

        public BasicAuthClaims(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public BasicAuthClaims(IReadOnlyList<string> args)
        {
            if (args.Count == 2)
            {
                Email = args[0];
                Password = args[1];
            }
            else
            {
                throw new ArgumentException("Need args.lengths == 2 is email and pass");
            }
        }

        [Required]
        [EmailAddress]
        [StringLength(64)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(32)]
        public string Password { get; set; }
    }
}