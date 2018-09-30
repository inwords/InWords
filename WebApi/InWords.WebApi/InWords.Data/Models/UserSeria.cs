namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    
    public class UserSeria
    {
        public int UserSeriaID { get; set; }

        public int? SeriaID { get; set; }
        public virtual Seria Seria { get; set; }

        public int? UserID { get; set; }
        public virtual User User { get; set; }
    }
}
