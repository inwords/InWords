using System;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId;
using InWords.WebApiTests.Controllers.v1._0;
using Xunit;

namespace InWords.WebApiTests.Services.GameWordsToDictionary.ByGameIdUserId
{
    public class GameToUserHandlerTests
    {
        [Fact]
        public async void HandleWords()
        {
            await using InWordsDataContext context = InWordsDataContextFactory.Create();

            // Two levels with two words, total words 4
            context.Creations.Add(new Creation {CreationId = 1});
            context.GameLevels.Add(new GameLevel {GameLevelId = 1, GameBoxId = 1});
            context.GameLevels.Add(new GameLevel {GameLevelId = 2, GameBoxId = 1});
            context.GameLevelWords.Add(new GameLevelWord {GameLevelId = 1, GameLevelWordId = 1, WordPairId = 1});
            context.GameLevelWords.Add(new GameLevelWord {GameLevelId = 1, GameLevelWordId = 2, WordPairId = 2});
            context.GameLevelWords.Add(new GameLevelWord {GameLevelId = 2, GameLevelWordId = 3, WordPairId = 1});
            context.GameLevelWords.Add(new GameLevelWord {GameLevelId = 2, GameLevelWordId = 4, WordPairId = 2});
            context.GameLevelWords.Add(new GameLevelWord {GameLevelId = 2, GameLevelWordId = 5, WordPairId = 3});

            // user that have one word
            context.Accounts.Add(
                new Account
                {
                    AccountId = 1,
                    Email = "test@test.ru",
                    RegistrationDate = default,
                    Role = RoleType.User,
                    Hash = new byte[128]
                });
            context.Users.Add(
                new User
                {
                    UserId = 1,
                    NickName = "Tester",
                    LastLogin = DateTime.MinValue
                }
            );
            // user have word id = 3
            context.UserWordPairs.Add(new UserWordPair {WordPairId = 3, UserId = 1});
            context.SaveChanges();

            var words = new GameToUserHandler(context);
            var query = new GameToUserQuery(1, 1);
            GameToUserQueryResult test = await words.Handle(query);

            Assert.Equal(2, test.WordsAdded);
        }
    }
}