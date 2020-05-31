using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.Profile.PublicData;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using Xunit;

namespace InWords.WebApiTests.Moduls.Profile.PublicData
{
    public class FindProfileIdTests
    {
        [Fact]
        public async void Find_Existed_Account()
        {
            // arrange
            int userId = 1;

            int other = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.SaveChangesAsync();

            // act
            var requestData = new FindIdRequest()
            {
                UserId = userId
            };
            var request = new AuthReq<FindIdRequest, PublicProfileReply>(requestData)
            {
                UserId = other,
            };
            var handler = new FindProfileId(context);
            var result = await handler.Handle(request);

            // assert
            Assert.Equal(userId, result.UserId);
        }
    }
}
