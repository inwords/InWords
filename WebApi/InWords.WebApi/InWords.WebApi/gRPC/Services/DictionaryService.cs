using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    [Authorize]
    public class DictionaryService : DictionaryProvider.DictionaryProviderBase
    {
        private readonly IMediator mediator;
        public DictionaryService(IMediator mediator) => this.mediator = mediator;

        public override Task<AddWordsReply> AddWords(AddWordsRequest request, ServerCallContext context)
             => mediator.AuthorizeHandler<AddWordsRequest, AddWordsReply>(request, context);

        public override Task<WordsReply> GetWords(GetWordsRequest request, ServerCallContext context)
            => mediator.AuthorizeHandler<GetWordsRequest, WordsReply>(request, context);

        public override  Task<AddWordsReply> UpdateWords(UpdateWordsRequest request, ServerCallContext context)
            =>  mediator.AuthorizeHandler<UpdateWordsRequest, AddWordsReply>(request, context);

        public override Task<Empty> DeleteWords(DeleteWordsRequest request, ServerCallContext context)
            => mediator.AuthorizeHandler<DeleteWordsRequest, Empty>(request, context);

        public override Task<LookupReply> Lookup(LookupRequest request, ServerCallContext context)
            => mediator.AnonimousHandler<LookupRequest, LookupReply>(request, context);

        public override Task<TrainingReply> Training(Empty request, ServerCallContext context)
            => mediator.AuthorizeHandler<Empty, TrainingReply>(request, context);

        public override Task<TrainingIdsReply> TrainingIds(Empty request, ServerCallContext context)
            => mediator.AuthorizeHandler<Empty, TrainingIdsReply>(request, context);
    }
}
