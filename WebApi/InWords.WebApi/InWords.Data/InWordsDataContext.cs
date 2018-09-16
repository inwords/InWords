namespace InWords.Data
{
    using InWords.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Diagnostics;

    public class InWordsDataContext : DbContext
    {
        private static bool _created = false;

        public InWordsDataContext()
        {
            RecreateDb();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionbuilder)
        {
            optionbuilder.UseSqlite(@"Data Source=InWordsDatabase.db");
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Account> Accounts { get; set; }

        private void RecreateDb()
        {

            if (!_created)
            {
                _created = true;
                Database.EnsureDeleted();
                Database.EnsureCreated();
            }
        }
    }
}
