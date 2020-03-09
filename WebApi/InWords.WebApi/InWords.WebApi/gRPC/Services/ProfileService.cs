using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using System;
using System.Diagnostics.CodeAnalysis;
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
        [SuppressMessage("Design", "CA1062:Проверить аргументы или открытые методы", Justification = "<Ожидание>")]
        public override async Task<RegistrationReply> Register(RegistrationRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(request);

            RegistrationReply reply = await mediator.Send(requestObject).ConfigureAwait(false);

            if (requestObject.StatusCode != StatusCode.OK)
            {
                context.Status = new Status(requestObject.StatusCode, requestObject.Detail);
            }
            return reply;
        }


        // Token
        [SuppressMessage("Design", "CA1062:Проверить аргументы или открытые методы", Justification = "<Ожидание>")]
        public override async Task<TokenReply> GetToken(TokenRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<TokenRequest, TokenReply>(request);
            TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);

            if (requestObject.StatusCode != StatusCode.OK)
            {
                context.Status = new Status(requestObject.StatusCode, requestObject.Detail);
            }
            return reply;
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
