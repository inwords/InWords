using Grpc.Core;
using InWords.Data.DTO.GameBox;
using InWords.Protobuf;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    [Authorize]
    public class ClassicCardGameService : ClassicCardGameProvider.ClassicCardGameProviderBase
    {
        private readonly IMediator mediator;
        public ClassicCardGameService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public override async Task<LevelPoints> Estimate(CardGameMetrics request, ServerCallContext context)
            => await mediator.AuthorizeHandler<CardGameMetrics, LevelPoints>(request, context)
            .ConfigureAwait(false);
    }
}
