﻿using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
        public override async Task<RegistrationReply> Register(RegistrationRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(request);
            try
            {
                RegistrationReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
                return reply;
            }
            catch (ArgumentException e)
            {
                CheckIfArgumentIsNull(ref context);
                context.Status = new Status(StatusCode.InvalidArgument, e.Message);
            }
            return new RegistrationReply();
        }

        // Token
        public override async Task<TokenReply> GetToken(TokenRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<TokenRequest, TokenReply>(request);
            try
            {
                TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
                return reply;
            }
            catch (ArgumentException e)
            {
                CheckIfArgumentIsNull(ref context);
                context.Status = new Status(StatusCode.InvalidArgument, e.Message);
            }
            return new TokenReply();
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
            if (!TryParseUserId(ref context, out int userId))
            {
                return new ConfirmEmailReply();
            }

            var reqestObject = new AuthorizedRequestObject<ConfirmEmailRequest, ConfirmEmailReply>(request)
            {
                UserId = userId
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
            return reply;
            // TODO: how to return error in grpc
        }

        private void CheckIfArgumentIsNull<T>(ref T resource)
        {
            if (resource == null)
                throw new ArgumentNullException($"{nameof(resource)} is null");
        }

        private bool TryParseUserId(ref ServerCallContext context, out int userId)
        {
            if (context == null)
            {
                userId = 0;
                return false;
            }
            try
            {
                userId = context.GetHttpContext().User.GetUserId();
                return true;
            }
            catch (ArgumentNullException)
            {
                userId = 0;
                return false;
            }
        }
    }
}
