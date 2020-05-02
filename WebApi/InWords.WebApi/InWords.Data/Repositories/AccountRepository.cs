using InWords.Common;
using InWords.Data.Domains;
using InWords.Data.Enums;
using System;
using System.Threading.Tasks;

namespace InWords.Data.Repositories
{
    [Obsolete]
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