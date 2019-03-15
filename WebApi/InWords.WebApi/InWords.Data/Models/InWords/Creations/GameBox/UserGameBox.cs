namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UserGameBox
    {
        [Key]
        public int UserGameBoxId { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int UserId { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int GameBoxId { get; set; }

        [ForeignKey("GameBoxID")]
        public virtual GameBox GameBox { get; set; }
    }
}
