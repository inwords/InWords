using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace InWords.WebApiTests.Extensions
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

        public static int AddWordPair(this InWordsDataContext context, string wordNative, string wordForeign)
        {
            Word nativeWord = new Word() { Content = wordNative, WordId = 0, LanguageId = 1 };
            Word foreignWord = new Word() { Content = wordForeign, WordId = 0, LanguageId = 2 };
            context.Words.Add(nativeWord);
            context.Words.Add(foreignWord);
            context.SaveChanges();
            WordPair wordPair = new WordPair() { WordForeignId = foreignWord.WordId, WordNativeId = nativeWord.WordId };
            context.WordPairs.Add(wordPair);
            context.SaveChanges();
            return wordPair.WordPairId;
        }

    }
}
