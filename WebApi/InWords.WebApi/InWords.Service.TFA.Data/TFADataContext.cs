using InWords.Common.Converters;
using InWords.Common.Providers;
using InWords.Service.TFA.Data.Models;

namespace InWords.Service.TFA.Data
{
    using Microsoft.EntityFrameworkCore;

    public class TFADataContext : DbContext
    {
        public DbSet<AuthRequest> AuthRequests { get; set; }

        private static bool _created = false;

        public TFADataContext() : base()
        {
            RecreateDb();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            var assembly = typeof(TFADataContext).Assembly;

            var resource = EmbeddedResource.GetApiRequestFile(AppConfig.DataConfig, assembly);

            var connectionStrings = new StringJsonConverter<ConnectionStrings>().Convert(resource);

            var connectionString = connectionStrings.DefaultConnection;

            optionBuilder.UseMySql(connectionString);
        }

        private void RecreateDb()
        {
            if (_created)
            {
                return;
            }

            _created = true;
            if (Database.EnsureCreated())
            {
                //SaveChanges();
            }
        }
    }
}