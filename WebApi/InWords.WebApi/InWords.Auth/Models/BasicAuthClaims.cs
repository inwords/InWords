using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace InWords.Auth
{
    public class BasicAuthClaims
    {
        [Required]
        [EmailAddress]
        [StringLength(64)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(32)]
        public string Password { get; set; }

        public BasicAuthClaims() { }

        public BasicAuthClaims(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public BasicAuthClaims(object[] args)
        {
            if (args.Length == 2)
            {
                Email = args[0].ToString();
                Password = args[1].ToString();
            }
            else
            {
                throw new ArgumentException("Neded args.lengs == 2 is email and pass");
            }
        }
    }
}
