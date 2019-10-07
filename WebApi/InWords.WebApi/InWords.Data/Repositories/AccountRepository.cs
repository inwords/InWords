using System.Threading.Tasks;
using InWords.Abstractions;
using InWords.Data.Domains;
using InWords.Data.Enums;

namespace InWords.Data.Repositories
{
    public class AccountRepository : Repository<Account>
    {
        public AccountRepository(InWordsDataContext context) : base(context)
        {
        }

        public async Task SetEmail(int id, string email)
        {
            Account account = await FindById(id);
            account.Role = RoleType.User;
            account.Email = email;
            await Update(account);
        }
    }
}