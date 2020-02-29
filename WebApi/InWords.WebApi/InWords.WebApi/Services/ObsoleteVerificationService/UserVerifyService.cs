using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Data.Repositories;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.VerificationService
{
    [Obsolete]
    public class UserVerifyService
    {
        private readonly AccountRepository accountRepository;

        public UserVerifyService(AccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        public async Task VerifyUser(int id, IValidator validator)
        {
            if (validator.IsValid())
            {
                Account account = await accountRepository.FindById(id);
                // TODO if (account.Role > RoleType.User) change enum enumeration
                account.Role = RoleType.User;
            }
        }
    }
}