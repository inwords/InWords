namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class SeriaWord
    {
        public int SeriaWordID { get; set; }

        public int SeriaID { get; set; }

        [Required]
        public virtual Seria Seria { get; set; }

        public int UserWordPairID { get; set; }

        [Required]
        public virtual UserWordPair UserWordPair { get; set; }

        public int Level { get; set; }

    }
}
