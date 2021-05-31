using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.AccountUpdate;
using InWords.WebApiTests.TestUtils;
using System.Linq;
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
                new AuthReq<DeleteAccountRequest, Empty>(
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
