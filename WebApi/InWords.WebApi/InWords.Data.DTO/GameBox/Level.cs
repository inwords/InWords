using System.Collections.Generic;

namespace InWords.Data.DTO.GameBox
{
    public class Level
    {
        public int LevelId { get; set; }

        public List<WordTranslation> WordTranslations { get; set; }
    }
}