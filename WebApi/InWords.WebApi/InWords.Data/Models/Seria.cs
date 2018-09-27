using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace InWords.Data.Models
{
    public class Seria
    {
        public int SeriaID { get; set; }

        [Required]
        [StringLength(64)]
        public string SeriaName { get; set; }

        [Required]
        public virtual User Creator { get; set; }
    }
}
