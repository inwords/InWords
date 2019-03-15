using System;
using System.ComponentModel.DataAnnotations;

namespace InWords.Service.TFA.Data.Models
{
    public class AuthRequest
    {
        [Key]
        public int AuthRequestId { get; set; }

        [StringLength(64)]
        public string Identity { get; set; }

        [StringLength(64)]
        public string Code { get; set; }

        public DateTime TimeToLive { get; set; }
    }
}