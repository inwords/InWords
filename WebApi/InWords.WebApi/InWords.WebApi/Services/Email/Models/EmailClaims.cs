using System.ComponentModel.DataAnnotations;

namespace InWords.WebApi.Services.Email.Models
{
    public class EmailClaims
    {
        [MaxLength(64)] public string Email { get; set; }

        [Range(100000, 999999)] public int Code { get; set; }
    }
}