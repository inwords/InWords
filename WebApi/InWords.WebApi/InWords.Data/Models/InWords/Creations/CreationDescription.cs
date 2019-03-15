namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    
    public class CreationDescription
    {
        public int CreationDescriptionId { get; set; }

        [Required]
        [StringLength(32)]
        public string Title { get; set; }


        [Required]
        [StringLength(64)]
        public string Description { get; set; }

        public int CreationId { get; set; }

        [ForeignKey("CreationID")]
        public virtual Creation Creation { get; set; }

        /// <summary>
        /// Description on this lang
        /// </summary>
        public int LanguageId { get; set; }

        [ForeignKey("LanguageID")]
        public virtual Language Language { get; set; }
    }
}
