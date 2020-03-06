using InWords.Data;
using InWords.Data.Domains.EmailEntitys;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.EmailUpdate;
using InWords.WebApiTests.TestUtils;
using System;
using System.Linq;
using Xunit;

namespace InWords.WebApiTests.Services.Users.EmailUpdate
{
    public class ConfirmEmailLinkTest
    {
        [Fact]
        public async void ConfirmValidCode()
        {
            // arrange
            int userId = 1;
            Guid rightGuid = Guid.NewGuid();
            string newEmail = "new@mail.ru";
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            context.EmailVerifies.Add(new EmailVerifies()
            {
                UserId = userId,
                Guid = rightGuid,
                Email = newEmail
            });
            await context.SaveChangesAsync();

            // act
            var requestObject =
                new RequestObject<ConfirmEmailLinkRequest, ConfirmEmailReply>(
                    new ConfirmEmailLinkRequest() { ActivationGuid = rightGuid.ToString() });

            var registration = new ConfirmEmailLink(context);
            var test = await registration.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(0, context.EmailVerifies.Count());
            Assert.Equal(newEmail, test.Email);
            Assert.Equal(newEmail, context.Accounts.First().Email);
        }

        [Fact]
        public async void WrongLinkTest()
        {
            // arrange
            Guid rightGuid = Guid.NewGuid();
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            context.EmailVerifies.Add(new EmailVerifies()
            {
                Guid = rightGuid,
            });
            await context.SaveChangesAsync();

            // act
            var requestObject =
                new RequestObject<ConfirmEmailLinkRequest, ConfirmEmailReply>(
                    new ConfirmEmailLinkRequest() { ActivationGuid = "wronglink" });

            var registration = new ConfirmEmailLink(context);
            await Assert.ThrowsAsync<ArgumentException>(() => registration.HandleRequest(requestObject));
        }

        [Fact]
        public async void GuidLinkNotFound()
        {
            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            context.EmailVerifies.Add(new EmailVerifies()
            {
                Guid = Guid.NewGuid(),
            });
            await context.SaveChangesAsync();

            // act
            var requestObject =
                new RequestObject<ConfirmEmailLinkRequest, ConfirmEmailReply>(
                    new ConfirmEmailLinkRequest() { ActivationGuid = $"{Guid.NewGuid()}" });

            var registration = new ConfirmEmailLink(context);
            await Assert.ThrowsAsync<ArgumentNullException>(() => registration.HandleRequest(requestObject));
        }
    }
}
