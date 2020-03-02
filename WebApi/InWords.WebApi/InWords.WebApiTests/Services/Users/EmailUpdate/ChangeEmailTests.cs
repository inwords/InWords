using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email.Abstractions;
using InWords.WebApi.Services.Email.Template;
using InWords.WebApi.Services.Users.EmailUpdate;
using InWords.WebApiTests.Controllers.v1._0;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.Services.Users.EmailUpdate
{
    public class ChangeEmailTests
    {
        [Fact]
        public async void RegisterUser()
        {
            string testEmail = "test@mail.ru";
            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();

            Account account = new Account() { Email = testEmail, Hash = new byte[255], Role = RoleType.Unverified };
            User User = new User() { Account = account, NickName = "user" };

            await context.SaveChangesAsync();

            var mock = new Mock<IEmailTemplateSender>();
            mock.Setup(a => a.SendMailAsync(testEmail, It.IsAny<EmailTemplateBase>()));
            // act 
            var registration = new ChangeEmail(context, mock.Object);

            var requestObject = new AuthorizedRequestObject<EmailChangeRequest, EmailChangeReply>(
                    new EmailChangeRequest()
                    {
                        Email = testEmail,
                    })
            {
                UserId = account.AccountId
            };

            var test = await registration.HandleRequest(
                new AuthorizedRequestObject<EmailChangeRequest, EmailChangeReply>(
                    new EmailChangeRequest()
                    {
                        Email = testEmail,
                    }))
                    .ConfigureAwait(false);
            
            // assert 
            Assert.Equal(1, context.EmailVerifies.Count());
            mock.Verify(a => a.SendMailAsync(testEmail, It.IsAny<EmailTemplateBase>()), Times.Once());
        }
    }
}
