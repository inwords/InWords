namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class SeriaWord
    {
        [Key]
        public int SeriaWordID { get; set; }

        /// <summary>
        /// Seria owner of word pair;
        /// </summary>
        public int SeriaID { get; set; }

        [ForeignKey("SeriaID")]
        public virtual Seria Seria { get; set; }

        /// <summary>
        /// Word pairs provided by user who config Seria
        /// </summary>
        public int UserWordPairID { get; set; }

        [ForeignKey("UserWordPairID")]
        public virtual UserWordPair UserWordPair { get; set; }

        public int Level { get; set; }
    }
}
