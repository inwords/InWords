using InWords.Data.Creations;
using InWords.Data.Domains;
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

        public DbSet<Word> Words { get; set; }

        public DbSet<WordPair> WordPairs { get; set; }

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
            modelBuilder.Entity<Word>(entity =>
            {
                entity.HasIndex(e => e.Content).IsUnique();
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