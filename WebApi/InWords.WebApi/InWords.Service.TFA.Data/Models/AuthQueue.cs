namespace InWords.Service.TFA.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class AuthQueue
    {
        [Key]
        public int AuthQueueID { get; set; }

        public string Identity { get; set; }

        public string Code { get; set; }

        public DateTime TimeToLive { get; set; }
    }
}