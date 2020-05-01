using Grpc.Core;
using InWords.Protobuf;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System;
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
            CheckIfArgumentIsNull(ref context);

            var reqestObject = new RequestObject<ConfirmEmailLinkRequest, ConfirmEmailReply>(request);
            ConfirmEmailReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
            // TODO: how to return error in grpc
        }

        // Reset Password
        // Update Password

        // Delete Profile
        [Authorize]
        public override async Task<Empty> DeleteAccount(DeleteAccountRequest request, ServerCallContext context)
        {
            CheckIfArgumentIsNull(ref context);

            var reqestObject = new AuthorizedRequestObject<DeleteAccountRequest, Empty>(request)
            {
                UserId = context.GetHttpContext().User.GetUserId()
            };
            Empty reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            if (reqestObject.StatusCode != StatusCode.OK)
            {
                context.Status = new Status(reqestObject.StatusCode, reqestObject.Detail);
            }
            return reply;
        }

        private void CheckIfArgumentIsNull<T>(ref T resource)
        {
            if (resource == null)
                throw new ArgumentNullException($"{nameof(resource)} is null");
        }
    }
}
