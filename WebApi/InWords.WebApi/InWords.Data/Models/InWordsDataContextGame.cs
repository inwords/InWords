namespace InWords.Data
{
    using InWords.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public partial class InWordsDataContext : DbContext
    {
        public DbSet<GameBox> GameBoxs { get; set; }

        public DbSet<GameLevel> GameLevels { get; set; }

        public DbSet<GameLevelWord> GameLevelWords { get; set; }

        public DbSet<UserGameBox> UserGameBoxs { get; set; }

        public DbSet<UserGameLevel> UserGameLevels { get; set; }
    }
}

