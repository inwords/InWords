namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UserWordPair
    {
        [Key]
        public int UserWordPairID { get; set; }

        public int WordPairID { get; set; }

        [ForeignKey("WordPairID")]
        public virtual WordPair WordPair { get; set; }

        public bool IsInvertPair { get; set; }

        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}