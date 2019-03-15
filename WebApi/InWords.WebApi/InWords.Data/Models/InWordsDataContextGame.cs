using InWords.Data.Models.InWords.Creations.GameBox;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models
{
    public partial class InWordsDataContext : DbContext
    {
        public DbSet<GameBox> GameBoxs { get; set; }

        public DbSet<GameLevel> GameLevels { get; set; }

        public DbSet<GameLevelWord> GameLevelWords { get; set; }

        public DbSet<UserGameBox> UserGameBoxs { get; set; }

        public DbSet<UserGameLevel> UserGameLevels { get; set; }
    }
}