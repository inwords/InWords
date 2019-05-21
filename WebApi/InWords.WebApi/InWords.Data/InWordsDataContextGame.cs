using InWords.Data.Creations.GameBox;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data
{
    public partial class InWordsDataContext
    {
        public DbSet<GameBox> GameBoxs { get; set; }

        public DbSet<GameLevel> GameLevels { get; set; }

        public DbSet<GameLevelWord> GameLevelWords { get; set; }

        public DbSet<UserGameLevel> UserGameLevels { get; set; }
    }
}