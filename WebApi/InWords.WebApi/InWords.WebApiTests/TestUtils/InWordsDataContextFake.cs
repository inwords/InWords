using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace InWords.WebApiTests.TestUtils
{
    public static class InWordsDataContextFake
    {
        public static async Task<Account> AddAccount(this InWordsDataContext context, int id = 0)
        {
            if (id == 0)
                id = await context.Accounts.MaxAsync(d => d.AccountId) + 1;

            Account account = new Account
            {
                AccountId = id,
                Email = $"test{id}@test.ru",
                RegistrationDate = default,
                Role = RoleType.User,
                Hash = new byte[128]
            };

            User user = new User
            {
                UserId = id,
                NickName = $"Tester{id}",
                LastLogin = DateTime.MinValue
            };

            context.Accounts.Add(account);
            context.Users.Add(user);

            return account;
        }
        public static void AddLanguages(this DbSet<Language> languages)
        {
            languages.Add(new Language() { LanguageId = 1, Title = "END" });
            languages.Add(new Language() { LanguageId = 2, Title = "RU" });
        }
    }
}
