namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    public class Word
    {
        public int WordID { get; set; }

        [Required]
        [StringLength(128)]
        public string Content { get; set; }

        public virtual Language Language { get; set; }
    }
}
