using System.Reflection;
using InWords.Common.Converters;
using InWords.Common.Providers;
using InWords.Service.TFA.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace InWords.Service.TFA.Data
{
    public class TFADataContext : DbContext
    {
        private static bool _created;

        public TFADataContext()
        {
            RecreateDb();
        }

        public DbSet<AuthRequest> AuthRequests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            Assembly assembly = typeof(TFADataContext).Assembly;

            string resource = EmbeddedResource.GetApiRequestFile(AppConfig.DATA_CONFIG, assembly);

            ConnectionStrings connectionStrings = new StringJsonConverter<ConnectionStrings>().Convert(resource);

            string connectionString = connectionStrings.DefaultConnection;

            optionBuilder.UseMySql(connectionString);
        }

        private void RecreateDb()
        {
            if (_created) return;

            _created = true;
            if (Database.EnsureCreated())
            {
                //SaveChanges();
            }
        }
    }
}