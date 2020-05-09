using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    public class AuthService : Authenticator.AuthenticatorBase
    {
        readonly IMediator mediator;
        public AuthService(IMediator mediator)
        {
            this.mediator = mediator;
        }


        public override async Task<TokenReply> OAuth(OAuthTokenRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<OAuthTokenRequest, TokenReply>(request);
            TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            context.UpdateStatus(requestObject);
            return reply;
        }

        public override async Task<TokenReply> Basic(TokenRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<TokenRequest, TokenReply>(request);
            TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            context.UpdateStatus(requestObject);
            return reply;
        }

        public override async Task<TokenReply> Register(RegistrationRequest request, ServerCallContext context)
        {
            var requestObject = new RequestObject<RegistrationRequest, TokenReply>(request);
            TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            context.UpdateStatus(requestObject);
            return new TokenReply()
            {
                Token = reply.Token,
                UserId = reply.UserId
            };
        }
    }
}
