using InWords.Data;
using InWords.Data.Repositories;
using InWords.WebApi.Controllers.v1;
using InWords.WebApiTests.TestUtils;

namespace InWords.WebApiTests.Controllers.v1._0
{
    public class AuthControllerTests
    {
        public static AuthController Create()
        {
            InWordsDataContext context = InWordsDataContextFactory.Create();
            return new AuthController(new AccountRepository(context), new UserRepository(context), null);
        }
    }
}