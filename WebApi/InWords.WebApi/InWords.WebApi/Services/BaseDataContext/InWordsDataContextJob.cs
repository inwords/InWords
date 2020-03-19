using InWords.Data;
using Microsoft.EntityFrameworkCore;

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
