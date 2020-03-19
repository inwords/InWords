using InWords.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.BaseDataContext
{
    public class InWordsDataContextJob : InWordsDataContext
    {
        public InWordsDataContextJob(string connectionString) : base(connectionString)
        {
        }

        public InWordsDataContextJob(DbContextOptions<InWordsDataContext> options) : base(options)
        {
        }
    }
}
