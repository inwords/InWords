namespace InWords.Data
{
    using InWords.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class InWordsDataContext : DbContext
    {
        private static bool _created = false;

        private readonly string connectionString;

        public InWordsDataContext(string connectionString) : base()
        {
            this.connectionString = connectionString;
            RecreateDb();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionbuilder)
        {
            optionbuilder.UseMySql(connectionString);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Account> Accounts { get; set; }

        public DbSet<Language> Languages { get; set; }

        public DbSet<Word> Words { get; set; }

        public DbSet<WordPair> WordPairs { get; set; }

        public DbSet<UserWordPair> UserWordPairs { get; set; }

        public DbSet<Seria> Series { get; set; }

        public DbSet<SeriaWord> SeriaWords { get; set; }

        public DbSet<UserSeria> UsersSerias { get; set; }

        public DbSet<SeriaDescription> SeriaDescription { get; set; }

        private void RecreateDb()
        {
            if (!_created)
            {
                _created = true;
                if (Database.EnsureCreated())
                {
                    Languages.Add(new Language() { Title = "English" });
                    Languages.Add(new Language() { Title = "Russian" });
                    SaveChanges();
                }
            }
        }
    }
}

