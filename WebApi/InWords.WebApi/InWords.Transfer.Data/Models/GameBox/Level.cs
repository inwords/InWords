using System.Collections.Generic;

namespace InWords.Transfer.Data.Models.GameBox
{
    public class Level
    {
        public int LevelId { get; set; }

        public List<WordTranslation> WordTranslations { get; set; }
    }
}