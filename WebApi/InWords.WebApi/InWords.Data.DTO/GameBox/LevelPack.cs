using System.Collections.Generic;

namespace InWords.Data.DTO.GameBox
{
    public class LevelPack
    {
        public int Level { get; set; }

        public List<WordTranslation> WordTranslations { get; set; }
    }
}