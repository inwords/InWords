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
        public override async Task<WordSetWordsReply> GetWordsList(WordSetWordsRequest request, ServerCallContext context)
        => await mediator.AuthorizeHandler<WordSetWordsRequest, WordSetWordsReply>(request, context)
            .ConfigureAwait(false);

        public override async Task<Empty> ToDictionary(WordSetWordsRequest request, ServerCallContext context)
        => await mediator.AuthorizeHandler<WordSetWordsRequest, Empty>(request, context)
            .ConfigureAwait(false);

        public override async Task<WordSetReply> GetSets(Empty request, ServerCallContext context)
        => await mediator.AuthorizeHandler<Empty, WordSetReply>(request, context)
            .ConfigureAwait(false);

        public override async Task<GetLevelsReply> GetLevels(GetLevelsRequest request, ServerCallContext context)
        => await mediator.AuthorizeHandler<GetLevelsRequest, GetLevelsReply>(request, context)
            .ConfigureAwait(false);

        public override async Task<GetLevelWordsReply> GetLevelWords(GetLevelWordsRequest request, ServerCallContext context)
        => await mediator.AuthorizeHandler<GetLevelWordsRequest, GetLevelWordsReply>(request, context)
            .ConfigureAwait(false);

        public override async Task<GameScoreReply> History(Empty request, ServerCallContext context)
        => await mediator.AuthorizeHandler<Empty, GameScoreReply>(request, context)
            .ConfigureAwait(false);
    }
}
