using Grpc.Core;
using System.Threading.Tasks;
using ProfilePackage.V2;
using MediatR;
using InWords.WebApi.Services.Abstractions;
using Microsoft.AspNetCore.Authorization;
using InWords.Service.Auth.Extensions;

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

        [Authorize]
        public override async Task<EmailChangeReply> RequestEmailUpdate(EmailChangeRequest request, ServerCallContext context)
        {
            var reqestObject = new AuthorizedRequestObject<EmailChangeRequest, EmailChangeReply>(request)
            {
                // TODO: how it works
                UserId = context.GetHttpContext().User.GetUserId()
            };
            EmailChangeReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
        }

        // Update Email
        // Confirm Email
        // Reset Password
        // Update Password
        // Delete Profile
    }
}
