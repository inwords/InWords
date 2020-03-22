using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class TokenRequestExample : IExamplesProvider<TokenRequest>
    {
        public TokenRequest GetExamples()
        {
            return new TokenRequest()
            {
                Email = "sample@examp.le",
                Password = "str0nGp@ssWoRd!"
            };
        }
    }
}
