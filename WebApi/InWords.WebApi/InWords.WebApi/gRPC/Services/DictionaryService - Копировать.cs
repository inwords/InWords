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

        public override Task<TokenReply> Register(RegistrationRequest request, ServerCallContext context)
        {
            return base.Register(request, context);
        }
    }
}
