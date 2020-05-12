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
        public AuthService(IMediator mediator) => this.mediator = mediator;
        public override Task<TokenReply> OAuth(OAuthTokenRequest request, ServerCallContext context)
            => mediator.AnonimousHandler<OAuthTokenRequest, TokenReply>(request, context);
        public override Task<TokenReply> Basic(TokenRequest request, ServerCallContext context)
            => mediator.AnonimousHandler<TokenRequest, TokenReply>(request, context);
        public override Task<TokenReply> Register(RegistrationRequest request, ServerCallContext context)
            => mediator.AnonimousHandler<RegistrationRequest, TokenReply>(request, context);
    }
}
