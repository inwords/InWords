namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    
    public class SeriaDescription
    {
        public int SeriaDescriptionID { get; set; }

        [Required]
        [StringLength(256)]
        public string Title { get; set; }


        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        /// <summary>
        /// Description to this seria
        /// </summary>
        public int SeriaID { get; set; }

        [ForeignKey("SeriaID")]
        public virtual Seria Seria { get; set; }

        /// <summary>
        /// Description on this lang
        /// </summary>
        public int LanguageID { get; set; }

        [ForeignKey("LanguageID")]
        public virtual Language Language { get; set; }
    }
}
