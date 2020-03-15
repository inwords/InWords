using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    [Authorize]
    public class AuthService : Authenticator.AuthenticatorBase
    {
        IMediator mediator;
        public AuthService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public override Task<TokenReply> OAuth2(OAuthTokenRequest request, ServerCallContext context)
        {
            return base.OAuth2(request, context);
        }

        public override Task<TokenReply> EmailPassword(TokenRequest request, ServerCallContext context)
        {
            return base.EmailPassword(request, context);
        }

        public override async Task<TokenReply> Register(RegistrationRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(request);

            RegistrationReply reply = await mediator.Send(requestObject).ConfigureAwait(false);

            if (requestObject.StatusCode != StatusCode.OK)
            {
                context.Status = new Status(requestObject.StatusCode, requestObject.Detail);
            }
            return new TokenReply()
            {
                Token = reply.Token,
                UserId = reply.Userid
            };
        }
    }
}
