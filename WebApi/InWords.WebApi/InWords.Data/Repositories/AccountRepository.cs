using InWords.Abstractions;
using InWords.Data.Domains;
using InWords.Data.Enums;
using System.Threading.Tasks;

namespace InWords.Data.Repositories
{
    public class AccountRepository : Repository<Account>
    {
        public AccountRepository(InWordsDataContext context) : base(context)
        {
        }

        public async Task SetEmail(int id, string email, EmailStates emailState)
        {
            Account account = await FindById(id);
            account.EmailState = emailState;
            account.Email = email;
            await Update(account);
        }
    }
}