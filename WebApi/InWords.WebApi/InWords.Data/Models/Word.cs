namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    public class Word
    {
        public int WordID { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public virtual Language Language { get; set; }
    }
}
