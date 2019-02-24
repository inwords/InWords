
namespace InWords.Transfer.Data.Models.GameBox
{
    using System.Collections.Generic;

    public class GamePack
    {
        public ICollection<CreationDescription> CreationDescriptions { get; set; }

        public List<LevelPack> LevelPacks { get; set; }
    }
}
