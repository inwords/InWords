using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class TokenResponceExample : IExamplesProvider<TokenReply>
    {
        public TokenReply GetExamples()
        {
            return new TokenReply()
            {
                Token = "ASDJASDgfhadssidlSadasdADKJHA1231IDJAS",
                UserId = 123
            };
        }
    }
}
