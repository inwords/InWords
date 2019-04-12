using InWords.Data.Models.InWords.Domains;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class AccountRepository : Repository<Account>
    {
        public AccountRepository(DbContext context) : base(context)
        {
        }
    }
}