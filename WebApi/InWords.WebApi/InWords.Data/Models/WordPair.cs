namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class WordPair
    {
        [Key]
        public int WordPairID { get; set; }

        public int? WordForeignID { get; set; }
        [Required]
        [ForeignKey("WordForeignID")]
        public virtual Word WordForeign { get; set; }

        public int? WordNativeID { get; set; }
        [Required]
        [ForeignKey("WordNativeID")]
        public virtual Word WordNative { get; set; }

        public int Rating { get; set; }
    }
}
