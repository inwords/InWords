using InWords.Data.Domains;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Creations.GameBox
{
    public class GameLevelWord
    {
        [Key] public int GameLevelWordId { get; set; }

        public int GameLevelId { get; set; }

        [ForeignKey(nameof(GameLevelId))] public virtual GameLevel GameLevel { get; set; }

        [MaxLength(128)] public string ForeignWord { get; set; }
        [MaxLength(128)] public string NativeWord { get; set; }
    }
}