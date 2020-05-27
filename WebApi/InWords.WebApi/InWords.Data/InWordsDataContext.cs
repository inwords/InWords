using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.Domains.Game;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data
{
    public partial class InWordsDataContext : DbContext
    {
        private static bool _created;

        private readonly string connectionString;

        public DbSet<OAuth> OAuths { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Account> Accounts { get; set; }

        public DbSet<Language> Languages { get; set; }

        public DbSet<UserWordPair> UserWordPairs { get; set; }

        public DbSet<Game> Games { get; set; }

        public DbSet<CreationDescription> CreationDescriptions { get; set; }
        public InWordsDataContext(string connectionString)
        {
            this.connectionString = connectionString;
            RecreateDb();
        }

        public InWordsDataContext(DbContextOptions<InWordsDataContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured) optionsBuilder.UseMySql(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OAuth>(e =>
            {
                e.HasIndex(e => e.OpenId).IsUnique();
            });

            modelBuilder.Entity<GameLevel>(e =>
            {
                e.HasKey(z => z.GameLevelId);
                e.HasOne(p => p.Historylevel)
                     .WithOne(a => a.GameLevel)
                     .HasForeignKey<Historylevel>(a => a.GameLevelId);
            });
        }

        private void RecreateDb()
        {
            if (!_created)
            {
                _created = true;
                if (Database.EnsureCreated())
                {
                    Languages.Add(new Language { Title = "English" });
                    Languages.Add(new Language { Title = "Russian" });
                    SaveChanges();
                }
            }
        }
    }
}