using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using InWords.Data.Models.InWords.Domains;

namespace InWords.Data.Models.InWords.Creations.GameBox
{
    public class UserGameBox
    {
        [Key]
        public int UserGameBoxId { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int GameBoxId { get; set; }

        [ForeignKey(nameof(GameBoxId))]
        public virtual GameBox GameBox { get; set; }
    }
}
