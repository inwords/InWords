using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    [Authorize]
    [Obsolete("Use wordset.estimate")]
    public class ClassicCardGameService : ClassicCardGameProvider.ClassicCardGameProviderBase
    {
        private readonly IMediator mediator;
        public ClassicCardGameService(IMediator mediator) => this.mediator = mediator;

        public override Task<LevelPoints> Estimate(CardGameMetrics request, ServerCallContext context)
            => mediator.AuthorizeHandler<CardGameMetrics, LevelPoints>(request, context);

        public override Task<LevelPoints> SaveGames(CardGameInfos request, ServerCallContext context)
            => mediator.AuthorizeHandler<CardGameInfos, LevelPoints>(request, context);
    }
}
