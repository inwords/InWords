using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.EmailUpdate;
using InWords.WebApiTests.Controllers.v1._0;
using InWords.WebApiTests.Extensions;
using ProfilePackage.V2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.Services.Users.EmailUpdate
{
    public class ConfirmEmailTest
    {
        [Fact]
        public async void ConfirmValidCode()
        {
            // arrange
            int userId = 1;
            int rightCode = 111111;
            string newEmail = "new@mail.ru";
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            context.EmailVerifies.Add(new EmailVerifies()
            {
                UserId = userId,
                Code = rightCode,
                Email = newEmail
            });
            await context.SaveChangesAsync();
            Account account = context.Accounts.First();

            // act
            var requestObject =
                new AuthorizedRequestObject<ConfirmEmailRequest, ConfirmEmailReply>(
                    new ConfirmEmailRequest() { Email = newEmail, Code = rightCode })
                {
                    UserId = account.AccountId
                };

            var registration = new ConfirmEmail(context);
            var test = await registration.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(0, context.EmailVerifies.Count());
            Assert.Equal(newEmail, test.Email);
            Assert.Equal(newEmail, context.Accounts.First().Email);
        }

        [Fact]
        public async void ConfirmInValidCode()
        {
            // arrange
            int userId = 1;
            int rightCode = 111111;
            int badCode = 222222;
            string newEmail = "new@mail.ru";
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            context.EmailVerifies.Add(new EmailVerifies()
            {
                UserId = userId,
                Code = rightCode,
                Email = newEmail
            });
            await context.SaveChangesAsync();
            Account account = context.Accounts.First();

            // act
            var requestObject =
                new AuthorizedRequestObject<ConfirmEmailRequest, ConfirmEmailReply>(
                    new ConfirmEmailRequest() { Email = newEmail, Code = badCode })
                {
                    UserId = account.AccountId
                };

            // assert 
            var registration = new ConfirmEmail(context);
            await Assert.ThrowsAsync<ArgumentNullException>(() => registration.HandleRequest(requestObject));
        }
    }
}
