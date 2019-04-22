using System.ComponentModel.DataAnnotations;

namespace InWords.Service.Auth.Models
{
    /// <summary>
    ///     Email and Password data transfer class
    /// </summary>
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
    }
}