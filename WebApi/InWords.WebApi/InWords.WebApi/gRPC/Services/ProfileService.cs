using Grpc.Core;
using System.Threading.Tasks;
using Registration.V2;
using MediatR;
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.gRPC.Services
{
    public class ProfileService : Registrator.RegistratorBase
    {
        IMediator mediator;
        public ProfileService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public override async Task<RegistrationReply> Register(RegistrationRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(request);
            RegistrationReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            return reply;
        }
        // Registration
        // Token
        // Update Email
        // Reset Password
        // Update Password
        // Delete Profile
    }
}
