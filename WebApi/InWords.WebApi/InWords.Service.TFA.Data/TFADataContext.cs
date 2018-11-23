namespace InWords.Service.TFA.Data
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class TFADataContext : DbContext
    {
        private static bool _created = false;

        private readonly string connectionString = null;

        public TFADataContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionbuilder)
        {
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