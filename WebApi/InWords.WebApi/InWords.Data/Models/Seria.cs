using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InWords.Data.Models
{
    public class Seria
    {
        public int SeriaID { get; set; }

        [Required]
        [StringLength(64)]
        public string SeriaName { get; set; }

        [ForeignKey("User")]
        public int CreatorID { get; set; }

        [ForeignKey("CreatorID")]
        [Required]
        public virtual User Creator { get; set; }
    }
}
