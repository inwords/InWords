namespace InWords.Data
{
    using InWords.Data.Enums;
    using InWords.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System;

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
            lock (Database)
            {
                if (!_created)
                {
                    //Database.EnsureDeleted();

                    _created = true;
                    if (Database.EnsureCreated())
                    {
                        var testAdmin = Accounts.Add(new Account() { Email = "admin@mail.ru", Password = "admin", Role = RoleType.Admin, RegistrationDate = DateTime.Now });
                        var testUser = Accounts.Add(new Account() { Email = "user@gmail.com", Password = "1234", Role = RoleType.User, RegistrationDate = DateTime.Now });
                        SaveChanges();
                        Users.Add(new User() { UserID = testAdmin.Entity.AccountID, NickName = "testAdmin" });
                        Users.Add(new User() { UserID = testUser.Entity.AccountID, NickName = "testUser" });
                        Languages.Add(new Language() { Title = "English" });
                        Languages.Add(new Language() { Title = "Russian" });
                        SaveChanges();
                    }
                }
            }
        }
    }
}

