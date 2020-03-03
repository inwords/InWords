using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

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
        [Authorize]
        public override async Task<ConfirmEmailReply> ConfirmEmail(ConfirmEmailRequest request, ServerCallContext context)
        {
            var reqestObject = new AuthorizedRequestObject<ConfirmEmailRequest, ConfirmEmailReply>(request)
            {
                UserId = context.GetHttpContext().User.GetUserId()
            };
            ConfirmEmailReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
            // TODO: how to return error in grpc
        }

        public override async Task<ConfirmEmailReply> ConfirmEmailLink(ConfirmEmailLinkRequest request, ServerCallContext context)
        {
            var reqestObject = new RequestObject<ConfirmEmailLinkRequest, ConfirmEmailReply>(request);
            ConfirmEmailReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
            // TODO: how to return error in grpc
        }

        // Reset Password
        // Update Password

        // Delete Profile
        public override async Task<Empty> DeleteAccound(DeleteAccountRequest request, ServerCallContext context)
        {
            var reqestObject = new AuthorizedRequestObject<DeleteAccountRequest, Empty>(request)
            {
                UserId = context.GetHttpContext().User.GetUserId()
            };
            Empty reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
            // TODO: how to return error in grpc
        }
    }
}
