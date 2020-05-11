using Grpc.Core;
using InWords.Protobuf;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    [Authorize]
    public class ProfileService : Profile.ProfileBase
    {
        readonly IMediator mediator;
        public ProfileService(IMediator mediator) => this.mediator = mediator;

        public override async Task<EmailChangeReply> RequestEmailUpdate(EmailChangeRequest request, ServerCallContext context)
            => await mediator.AuthorizeHandler<EmailChangeRequest, EmailChangeReply>(request, context).ConfigureAwait(false);

        public override async Task<ConfirmEmailReply> ConfirmEmail(ConfirmEmailRequest request, ServerCallContext context)
            => await mediator.AuthorizeHandler<ConfirmEmailRequest, ConfirmEmailReply>(request, context).ConfigureAwait(false);

        [AllowAnonymous]
        public override async Task<ConfirmEmailReply> ConfirmEmailLink(ConfirmEmailLinkRequest request, ServerCallContext context)
            => await mediator.AuthorizeHandler<ConfirmEmailLinkRequest, ConfirmEmailReply>(request, context).ConfigureAwait(false);

        public override Task<ProfileReply> Current(Empty request, ServerCallContext context)
        {
            return base.Current(request, context);
        }

        public override async Task<PublicProfile> FindId(FindIdRequest request, ServerCallContext context)
            => await mediator.AuthorizeHandler<FindIdRequest, PublicProfile>(request, context).ConfigureAwait(false);

        public override Task<ProfilesReply> FindNickname(FindUsernameRequest request, ServerCallContext context)
        {
            return base.FindNickname(request, context);
        }

        public override Task<Empty> Update(UpdateRequest request, ServerCallContext context)
        {
            return base.Update(request, context);
        }

        // Reset Password
        // Update Password

        // Delete Profile
        public override async Task<Empty> DeleteAccount(DeleteAccountRequest request, ServerCallContext context)
            => await mediator.AuthorizeHandler<DeleteAccountRequest, Empty>(request, context).ConfigureAwait(false);
    }
}
