using InWords.Data.Domains.EmailEntitys;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data
{
    public partial class InWordsDataContext
    {
        public DbSet<EmailVerifies> EmailVerifies { get; set; }
    }
}