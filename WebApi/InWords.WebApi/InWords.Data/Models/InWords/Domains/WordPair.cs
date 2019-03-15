namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class WordPair
    {
        [Key]
        public int WordPairId { get; set; }

        public int WordForeignId { get; set; }

        [ForeignKey("WordForeignID")]
        public virtual Word WordForeign { get; set; }

        public int WordNativeId { get; set; }

        [ForeignKey("WordNativeID")]
        public virtual Word WordNative { get; set; }

        public int Rating { get; set; }
    }
}
