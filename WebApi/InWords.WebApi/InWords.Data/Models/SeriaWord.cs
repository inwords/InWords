namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class SeriaWord
    {
        public int SeriaWordID { get; set; }

        [Required]
        public virtual WordPair WordPair { get; set; }

        [Required]
        public virtual Seria Seria { get; set; }
    }
}
