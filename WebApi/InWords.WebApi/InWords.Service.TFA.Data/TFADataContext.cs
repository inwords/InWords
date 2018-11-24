namespace InWords.Service.TFA.Data
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class TFADataContext : DbContext
    {
        public DbSet<AuthRequest> AuthRequests { get; set; }

        private static bool _created = false;

        public TFADataContext() : base()
        {
            RecreateDb();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionbuilder)
        {
            var resource = Common.EmbeddedResource.GetApiRequestFile(AppConfig.DATACONFIG);

            DatabaseConfig databaseConfig = new Common.StringJsonConverter<DatabaseConfig>().Convert(resource);

            string connectionString = databaseConfig.ConnectionStrings[AppConfig.DefaultConnection];

            optionbuilder.UseMySql(connectionString);
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