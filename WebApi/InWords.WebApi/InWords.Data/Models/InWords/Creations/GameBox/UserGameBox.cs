namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UserGameBox
    {
        [Key]
        public int UserGameBoxID { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int GameBoxID { get; set; }

        [ForeignKey("GameBoxID")]
        public virtual GameBox GameBox { get; set; }
    }
}
