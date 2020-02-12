using Registration.V2;
using InWords.Data;
using InWords.WebApi.Services.Abstractions;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Registration
{
    public class UserRegistration : StructRequestHandler<RegistrationRequest, RegistrationReply, InWordsDataContext>
    {
        public UserRegistration(InWordsDataContext context) : base(context)
        {
        }

        public override Task<RegistrationReply> Handle(
            RequestObject<RegistrationRequest, RegistrationReply> request,
            CancellationToken cancellationToken = default)
        {

            return base.Handle(request, cancellationToken);
        }
    }
}
