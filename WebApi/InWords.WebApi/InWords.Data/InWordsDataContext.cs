namespace InWords.Data
{
    using InWords.Data.Enums;
    using InWords.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Diagnostics;

    public class InWordsDataContext : DbContext
    {
        private static bool _created = false;

        public InWordsDataContext()
        {
            RecreateDb();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionbuilder)
        {
            optionbuilder.UseSqlite(@"Data Source=InWordsDatabase.db");
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
                    _created = true;
                    //TODO MIGRATE -script
                    if (Database.EnsureCreated())
                    {
                        var testAdmin = Accounts.Add(new Account() { Email = "admin@mail.ru", Password = "admin", Role = RoleType.Admin, RegistrationDate = DateTime.Now });
                        var testUser = Accounts.Add(new Account() { Email = "user@gmail.com", Password = "1234", Role = RoleType.User, RegistrationDate = DateTime.Now });
                        SaveChanges();
                        Users.Add(new User() { UserID = testAdmin.Entity.AccountID, NickName = "testAdmin" });
                        Users.Add(new User() { UserID = testUser.Entity.AccountID, NickName = "testUser" });
                        SaveChanges();
                    }
                }
            }
        }
    }
}
