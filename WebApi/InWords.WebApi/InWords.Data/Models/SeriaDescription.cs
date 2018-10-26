using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InWords.Data.Models
{
    public class SeriaDescription
    {
        public int SeriaDescriptionID { get; set; }

        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        /// <summary>
        /// Description to this seria
        /// </summary>
        [ForeignKey("Seria")]
        public int SeriaID { get; set; }
        [ForeignKey("SeriaID")]
        public virtual Seria Seria { get; set; }


        /// <summary>
        /// Description on this lang
        /// </summary>
        [ForeignKey("Language")]
        public int LanguageID { get; set; }
        [ForeignKey("LanguageID")]
        public virtual Language Language { get; set; }
    }
}
