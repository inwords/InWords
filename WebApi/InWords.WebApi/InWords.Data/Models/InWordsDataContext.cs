namespace InWords.Data.Models
{
    using Microsoft.EntityFrameworkCore;

    public class InWordsDataContext : DbContext
    {
        private static bool _created = false;

        public InWordsDataContext()
        {
            if (!_created)
            {
                _created = true;
                Database.EnsureDeleted();
                Database.EnsureCreated();
            }
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionbuilder)
        {
            optionbuilder.UseSqlite(@"Data Source=App_Data\InWordsDatabase.db");
        }

        public DbSet<User> Users { get; set; }
    }
}
