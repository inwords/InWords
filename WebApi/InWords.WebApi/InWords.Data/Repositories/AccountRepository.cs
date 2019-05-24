using InWords.Abstractions;
using InWords.Data.Domains;

namespace InWords.Data.Repositories
{
    public class AccountRepository : Repository<Account>
    {
        public AccountRepository(InWordsDataContext context) : base(context)
        {
        }
    }
}