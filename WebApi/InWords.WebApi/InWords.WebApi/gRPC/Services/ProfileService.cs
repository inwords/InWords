using Grpc.Core;
using System.Threading.Tasks;
using Registration.V2;

namespace InWords.WebApi.gRPC.Services
{
    public class ProfileService : Registrator.RegistratorBase
    {

        public ProfileService()
        {

        }

        public override Task<RegistrationReply> Register(RegistrationRequest request, ServerCallContext context)
        {
            return base.Register(request, context);
        }
        // Registration
        // Token
        // Update Email
        // Reset Password
        // Update Password
        // Delete Profile
    }
}
