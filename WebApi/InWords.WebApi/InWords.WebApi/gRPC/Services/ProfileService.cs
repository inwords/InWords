using Grpc.Core;
using System.Threading.Tasks;
using ProfilePackage.V2;
using MediatR;
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.gRPC.Services
{
    public class ProfileService : Profile.ProfileBase
    {
        IMediator mediator;
        public ProfileService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        // Registration
        public override async Task<RegistrationReply> Register(RegistrationRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(request);
            RegistrationReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            return reply;
            // TODO: how to return error in grpc
        }

        // Token
        public override async Task<TokenReply> GetToken(TokenRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<TokenRequest, TokenReply>(request);
            TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            return reply;
            // TODO: how to return error in grpc
        }

        // Update Email
        // Confirm Email
        // Reset Password
        // Update Password
        // Delete Profile
    }
}
