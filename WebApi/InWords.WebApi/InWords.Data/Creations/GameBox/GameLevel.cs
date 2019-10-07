using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Creations.GameBox
{
    public class GameLevel
    {
        [Key] public int GameLevelId { get; set; }

        public int GameBoxId { get; set; }

        [ForeignKey(nameof(GameBoxId))] public virtual Creation GameBox { get; set; }

        public int Level { get; set; }
    }
}