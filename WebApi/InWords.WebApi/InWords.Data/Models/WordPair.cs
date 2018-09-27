namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class WordPair
    {
        public int WordPairID { get; set; }

        [Required]
        public virtual Word WordForeign { get; set; }

        [Required]
        public virtual Word WordNative { get; set; }

        public int Rating { get; set; }
    }
}
