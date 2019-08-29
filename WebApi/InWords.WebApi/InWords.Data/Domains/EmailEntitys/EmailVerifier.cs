using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InWords.Data.Domains.EmailEntitys
{
    public class EmailVerifier
    {
        [Key]
        public int UserId { get; set; }

        public DateTime SentTime { get; set; }

        public int Code { get; set; }

        public short Attempts { get; set; }
    }
}
