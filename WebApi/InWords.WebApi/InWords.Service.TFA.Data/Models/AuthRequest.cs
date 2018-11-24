namespace InWords.Service.TFA.Data
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class AuthRequest
    {
        [Key]
        public int AuthRequestID { get; set; }

        [StringLength(64)]
        public string Identity { get; set; }

        [StringLength(64)]
        public string Code { get; set; }

        public DateTime TimeToLive { get; set; }
    }
}