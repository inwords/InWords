using InWords.Data.Creations.GameBox;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InWords.Data.Domains.Game
{
    public class Historylevel
    {
        [Key,ForeignKey(nameof(GameLevel))] 
        public int GameLevelId { get; set; }
        public DateTime DateTime { get; set; }
        public int WordsCount { get; set; }
    
        public GameLevel GameLevel { get; set; }
    }
}
