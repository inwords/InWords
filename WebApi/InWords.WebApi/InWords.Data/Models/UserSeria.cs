namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UserSeria
    {
        [Key]
        public int UserSeriaID { get; set; }

        public int? SeriaID { get; set; }

        [ForeignKey("SeriaID")]
        public virtual Seria Seria { get; set; }

        public int? UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}
