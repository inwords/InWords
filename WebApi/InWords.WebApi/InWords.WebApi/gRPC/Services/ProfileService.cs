﻿using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    [Authorize]
    public class ProfileService : Profile.ProfileBase
    {
        readonly IMediator mediator;
        public ProfileService(IMediator mediator) => this.mediator = mediator;

        [AllowAnonymous]
        public override Task<ConfirmEmailReply> ConfirmEmailLink(ConfirmEmailLinkRequest request, ServerCallContext context)
            => mediator.AnonimousHandler<ConfirmEmailLinkRequest, ConfirmEmailReply>(request, context);

        public override Task<EmailChangeReply> RequestEmailUpdate(EmailChangeRequest request, ServerCallContext context)
            => mediator.AuthorizeHandler<EmailChangeRequest, EmailChangeReply>(request, context);

        public override Task<ConfirmEmailReply> ConfirmEmail(ConfirmEmailRequest request, ServerCallContext context)
            => mediator.AuthorizeHandler<ConfirmEmailRequest, ConfirmEmailReply>(request, context);

        public override Task<PublicProfileReply> FindId(FindIdRequest request, ServerCallContext context)
            => mediator.AuthorizeHandler<FindIdRequest, PublicProfileReply>(request, context);

        public override Task<PublicProfilesReply> FindNickname(FindUsernameRequest request, ServerCallContext context)
            => mediator.AuthorizeHandler<FindUsernameRequest, PublicProfilesReply>(request, context);

        public override Task<Empty> DeleteAccount(DeleteAccountRequest request, ServerCallContext context)
            => mediator.AuthorizeHandler<DeleteAccountRequest, Empty>(request, context);

        public override Task<ProfileReply> Current(Empty request, ServerCallContext context)
            => mediator.AuthorizeHandler<Empty, ProfileReply>(request, context);

        public override Task<Empty> Update(UpdateRequest request, ServerCallContext context)
            => mediator.AuthorizeHandler<UpdateRequest, Empty>(request, context);



        // Reset Password
        // Update Password
    }
}
