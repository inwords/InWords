namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    public class UserWordPair
    {
        public int UserWordPairID { get; set; }

        public int WordPairID { get; set; }
        [Required]
        public virtual WordPair WordPair { get; set; }

        [Required]
        public bool IsInvertPair { get; set; }

        public int UserID { get; set; }
        [Required]
        public virtual User User { get; set; }
    }
}
