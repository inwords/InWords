using InWords.Data.Domains;
using InWords.WebApi.Modules.DictionaryService.Extentions;
using InWords.WebApiTests.TestUtils;
using System;
using System.Linq;
using Xunit;

namespace InWords.WebApiTests.Services.DictionaryService.Extentions
{
    public class AddUserWordPairExtentionsTests
    {
        [Fact]
        public async void AddUserWordsPairsTest()
        {
            // arrange
            int excectedCount = 3;
            using var context = InWordsDataContextFactory.Create();
            Account account1 = await context.AddAccount(1);
            Account account2 = await context.AddAccount(2);
            context.Add(account1);
            context.Add(account2);
            context.Add(new UserWordPair(1, 1));
            context.Add(new UserWordPair(2, 1));
            context.SaveChanges();
            // act
            // todo continue here
            context.UserWordPairs.AddUserWordPair(new UserWordPair[] { new UserWordPair(2, 1), new UserWordPair(3, 1) });
            context.SaveChanges();
            // assert
            Assert.Equal(excectedCount, context.UserWordPairs.Count());
        }

        [Fact]
        public async void AddUserWordPairsInvertedPair()
        {
            // arrange
            int expectedWordsCount = 4;
            using var context = InWordsDataContextFactory.Create();
            Account account1 = await context.AddAccount(1);
            context.Add(account1);
            context.Add(new UserWordPair(1, account1.AccountId)); // user1 word 
            context.Add(new UserWordPair(2, 1) { IsInvertPair = true }); // user1 word
            context.SaveChanges();
            // act
            context.UserWordPairs.AddUserWordPair(
                new UserWordPair[] {
                    new UserWordPair(2, account1.AccountId), // should be added to user1
                    new UserWordPair(3, account1.AccountId), // should be added to user1
                });
            context.SaveChanges();
            // assert
            Assert.Equal(expectedWordsCount, context.UserWordPairs.Count());
        }

        [Fact]
        public async void AddUserWordPairsMultiUser()
        {
            // arrange
            int expectedWordsCount = 2 + 3;
            int user1WordsCount = 1 + 2;
            int user2WordsCount = 1 + 1;
            using var context = InWordsDataContextFactory.Create();
            Account account1 = await context.AddAccount(1);
            Account account2 = await context.AddAccount(2);
            context.Add(account1);
            context.Add(account2);
            context.Add(new UserWordPair(2, account1.AccountId) { IsInvertPair = true }); // user1 word 
            context.Add(new UserWordPair(2, account2.AccountId)); // user2 word 
            context.SaveChanges();
            // act
            context.UserWordPairs.AddUserWordPair(
                new UserWordPair[] {
                    new UserWordPair(2, account1.AccountId), // should be added to user1
                    new UserWordPair(3, account1.AccountId), // should be added to user1
                    new UserWordPair(3, account2.AccountId) // should be added to to user2
                });
            context.SaveChanges();
            // assert
            Assert.Equal(expectedWordsCount, context.UserWordPairs.Count());
            Assert.Equal(user1WordsCount, context.UserWordPairs.Where(s => s.UserId == account1.AccountId).Count());
            Assert.Equal(user2WordsCount, context.UserWordPairs.Where(s => s.UserId == account2.AccountId).Count());
        }
    }
}
