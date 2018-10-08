using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public int SeriaID { get; set; }

        public virtual Seria Seria { get; set; }


        /// <summary>
        /// Description on this lang
        /// </summary>
        public int LanguageID { get; set; }

        public virtual Language Language { get; set; }
    }
}
