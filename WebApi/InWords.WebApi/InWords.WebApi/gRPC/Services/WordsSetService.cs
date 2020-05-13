using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;


namespace InWords.WebApi.gRPC.Services
{
    [Authorize]
    public class WordsSetService : WordSetProvider.WordSetProviderBase
    {
        private readonly IMediator mediator;
        public WordsSetService(IMediator mediator) => this.mediator = mediator;
        public override Task<WordSetWordsReply> GetWordsList(WordSetWordsRequest request, ServerCallContext context)
        => mediator.AuthorizeHandler<WordSetWordsRequest, WordSetWordsReply>(request, context);

        public override Task<Empty> ToDictionary(WordSetWordsRequest request, ServerCallContext context)
        => mediator.AuthorizeHandler<WordSetWordsRequest, Empty>(request, context);

        public override Task<WordSetReply> GetSets(Empty request, ServerCallContext context)
        => mediator.AuthorizeHandler<Empty, WordSetReply>(request, context);

        public override Task<GetLevelsReply> GetLevels(GetLevelsRequest request, ServerCallContext context)
        => mediator.AuthorizeHandler<GetLevelsRequest, GetLevelsReply>(request, context);

        public override Task<GetLevelWordsReply> GetLevelWords(GetLevelWordsRequest request, ServerCallContext context)
        => mediator.AuthorizeHandler<GetLevelWordsRequest, GetLevelWordsReply>(request, context);

        public override Task<GameScoreReply> History(Empty request, ServerCallContext context)
        => mediator.AuthorizeHandler<Empty, GameScoreReply>(request, context);

        public override Task<TrainingScoreReply> Estimate(TrainingDataRequest request, ServerCallContext context)
        {
            return base.Estimate(request, context);
        }
    }
}
