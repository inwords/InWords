using Grpc.Core;
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
    public class DictionaryService : DictionaryProvider.DictionaryProviderBase
    {
        private readonly IMediator mediator;
        public DictionaryService(IMediator mediator) => this.mediator = mediator;

        public override async Task<AddWordsReply> AddWords(AddWordsRequest request, ServerCallContext context)
             => await mediator.AuthorizeHandler<AddWordsRequest, AddWordsReply>(request, context).ConfigureAwait(false);

        public override async Task<WordsReply> GetWords(GetWordsRequest request, ServerCallContext context)
            => await mediator.AuthorizeHandler<GetWordsRequest, WordsReply>(request, context).ConfigureAwait(false);

        public override async Task<AddWordsReply> UpdateWords(UpdateWordsRequest request, ServerCallContext context)
            => await mediator.AuthorizeHandler<UpdateWordsRequest, AddWordsReply>(request, context).ConfigureAwait(false);

        public override async Task<Empty> DeleteWords(DeleteWordsRequest request,ServerCallContext context)
            => await mediator.AuthorizeHandler<DeleteWordsRequest, Empty>(request, context).ConfigureAwait(false);

        public override async Task<LookupReply> Lookup(LookupRequest request, ServerCallContext context)
        {
            var reqestObject = new RequestObject<LookupRequest, LookupReply>(request);
            var response = await mediator.Send(reqestObject).ConfigureAwait(false);
            context.UpdateStatus(reqestObject);
            return response;
        }

        public override Task<TrainingReply> Training(Empty request, ServerCallContext context)
        {
            return base.Training(request, context);
        }

        public override Task<TrainingIdsReply> TrainingIds(Empty request, ServerCallContext context)
        {
            return base.TrainingIds(request, context);
        }
    }
}
