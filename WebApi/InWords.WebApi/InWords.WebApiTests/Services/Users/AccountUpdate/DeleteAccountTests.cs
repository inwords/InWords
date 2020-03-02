using InWords.Data;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.AccountUpdate;
using InWords.WebApiTests.Controllers.v1._0;
using InWords.WebApiTests.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.Services.Users.AccountUpdate
{
    public class DeleteAccountTests
    {
        [Fact]
        public async void DeleteExistedAccount()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();

            // act
            var requestObject =
                new AuthorizedRequestObject<DeleteAccountRequest, Empty>(
                    new DeleteAccountRequest() { Text = "Delete me just for test" })
                {
                    UserId = userId
                };

            var registration = new DeleteAccount(context);
            await registration.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Single(context.Accounts);
            Assert.Equal(otherId, context.Accounts.First().AccountId);
        }
    }
}
