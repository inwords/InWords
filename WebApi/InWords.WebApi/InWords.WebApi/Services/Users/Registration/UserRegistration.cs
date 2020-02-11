using Registration.V2;
using InWords.Data;
using InWords.WebApi.Services.Abstractions;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Registration
{
    public class UserRegistration : ContextRequestHandler<UserRegistrationQuery, RegistrationReply, InWordsDataContext>
    {
        public UserRegistration(InWordsDataContext context) : base(context)
        {
        }

        public override Task<RegistrationReply> Handle(UserRegistrationQuery request, CancellationToken cancellationToken = default)
        {

            return base.Handle(request, cancellationToken);
        }
    }
}
