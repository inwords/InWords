
namespace InWords.Transfer.Data.Models.GameBox
{
    using System.Collections.Generic;

    public class LevelPack : BaseInfo
    {
        public int Level { get; set; }

        public List<WordTranslation> WordTranslations { get; set; }
    }
}
