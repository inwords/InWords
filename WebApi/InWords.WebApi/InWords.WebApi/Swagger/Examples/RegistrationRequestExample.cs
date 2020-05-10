using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class RegistrationRequestExample : IExamplesProvider<RegistrationRequest>
    {
        public RegistrationRequest GetExamples()
        {
            return new RegistrationRequest()
            {
                Email = "user@mail.yo",
                Password = "is IsAnonymous is true, email won't be send",
                IsAnonymous = false
            };
        }
    }
}
