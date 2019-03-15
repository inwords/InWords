namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    public class Word
    {
        [Key]
        public int WordId { get; set; }

        [Required]
        [StringLength(128)]
        public string Content { get; set; }

        public int? LanguageId { get; set; }
        //TODO [Required] Language
        public virtual Language Language { get; set; }
    }
}
