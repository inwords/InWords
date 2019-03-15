namespace InWords.Transfer.Data
{
    using System.Collections.Generic;

    public class Level
    {
        public int LevelId { get; set; }

        public List<WordTranslation> WordTranslations { get; set; }
    }
}
