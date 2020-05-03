using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Extensions;
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

        public override Task<LevelPoints> SaveGames(CardGameInfo request, ServerCallContext context)
        {
            return base.SaveGames(request, context);
        }
    }
}
