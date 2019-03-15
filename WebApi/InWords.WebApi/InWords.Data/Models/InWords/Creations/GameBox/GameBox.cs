using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Models.InWords.Creations.GameBox
{
    public class GameBox
    {
        [Key]
        public int GameBoxId { get; set; }

        public int CreationId { get; set; }

        [ForeignKey(nameof(CreationId))]
        public virtual Creation Creation { get; set; }
    }
}
