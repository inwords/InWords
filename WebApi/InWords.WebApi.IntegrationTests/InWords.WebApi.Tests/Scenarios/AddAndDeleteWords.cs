using InWords.Protobuf;
using InWords.WebApi.Tests.Services.DictionaryService;
using InWords.WebApi.Tests.Services.ProfileService;
using InWords.WebApi.Tests.TestUtils;
using Xunit;

namespace InWords.WebApi.Tests.Scenarios
{
    public class AddAndDeleteWords
    {
        [Fact]
        public async void AddAndDeleteWords_Ok()
        {
            string login = ProfileUtils.GetLogin();
            string token = ProfileRegistrator.RegisterAccount(login);
            ProfileRegistrator.InvalidPasswordTest(login);
            ProfileRegistrator.InvalidAccountTest(login);
            DictionaryService.AddOneWordTest(token);
            ProfileRegistrator.DeleteExistedProfileTest(token);
        }
    }
}
