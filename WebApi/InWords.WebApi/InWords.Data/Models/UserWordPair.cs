namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    public class UserWordPair
    {
        public int UserWordPairID { get; set; }

        [Required]
        public virtual WordPair WordPair { get; set; }

        [Required]
        public bool IsInvertPair { get; set; }

        [Required]
        public virtual User User { get; set; }
    }
}
