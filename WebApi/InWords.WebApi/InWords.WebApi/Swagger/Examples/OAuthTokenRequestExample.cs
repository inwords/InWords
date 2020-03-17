using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class OAuthTokenRequestExample : IExamplesProvider<OAuthTokenRequest>
    {
        public OAuthTokenRequest GetExamples()
        {
            return new OAuthTokenRequest()
            {
                ServiceName = "google",
                Token = "jjjjjjjjjjjjjjjj.wwwwwwwwwwwwwww.ttttttttttttttt"
            };
        }
    }
}
