
namespace InWords.Transfer.Data.Models.GameBox
{
    using System.Collections.Generic;

    public class GamePack
    {
        public string Title { get; set; }

        public List<LevelPack> LevelPacks { get; set; }
    }
}
