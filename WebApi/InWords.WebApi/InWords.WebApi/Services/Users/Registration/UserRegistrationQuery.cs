using InWords.WebApi.Services.Abstractions;
using Registration.V2;

namespace InWords.WebApi.Services.Users.Registration
{
    public class UserRegistrationQuery : RequestObject<RegistrationRequest, RegistrationReply>
    {
        public UserRegistrationQuery(RegistrationRequest value) : base(value) { }
    }
}
