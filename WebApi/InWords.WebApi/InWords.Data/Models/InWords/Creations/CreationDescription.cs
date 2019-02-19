namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    
    public class CreationDescription
    {
        public int CreationDescriptionID { get; set; }

        [Required]
        [StringLength(256)]
        public string Title { get; set; }


        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        /// <summary>
        /// Description to this seria
        /// </summary>
        public int CreationID { get; set; }

        [ForeignKey("CreationID")]
        public virtual Creation Creation { get; set; }

        /// <summary>
        /// Description on this lang
        /// </summary>
        public int LanguageID { get; set; }

        [ForeignKey("LanguageID")]
        public virtual Language Language { get; set; }
    }
}
