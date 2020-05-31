using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.Profile.PublicData;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApiTests.TestUtils;
using Xunit;

namespace InWords.WebApiTests.Moduls.Profile.PublicData
{
    public class GetCurrentProfileTests
    {
        [Fact]
        public async void Find_Existed_Account()
        {
            // arrange
            int userId = 1;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.SaveChangesAsync();

            var request = new AuthReq<Empty, ProfileReply>(new Empty())
            {
                UserId = userId,
            };

            var handler = new GetCurrentProfile(context);
            var result = await handler.Handle(request);

            // assert
            Assert.Equal(userId, result.UserId);
        }
    }
}
