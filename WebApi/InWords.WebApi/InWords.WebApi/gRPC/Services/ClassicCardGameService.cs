using Grpc.Core;
using InWords.Protobuf;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    public class ClassicCardGameService : ClassicCardGameProvider.ClassicCardGameProviderBase
    {
        private IMediator mediator;
        public ClassicCardGameService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public override Task<LevelPoints> Estimate(CardGameMetrics request, ServerCallContext context)
        {
            return base.Estimate(request, context);
        }
    }
}
