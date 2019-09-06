using InWords.Data.Enums;
using InWords.Data.Repositories;
using InWords.WebApi.Services.Email.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.VerificationService
{
    public class UserVerifyService
    {
        private readonly AccountRepository accountRepository = null;
        public UserVerifyService(AccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        public async Task VerifyUser(int id, IValidator validator)
        {
            if (validator.IsValid())
            {
                var account = await accountRepository.FindById(id);
                // TODO if (account.Role > RoleType.User) change enum enumeration
                account.Role = RoleType.User;
            }
        }
    }
}
