using Grpc.Core;
using InWords.Protobuf;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace InWords.WebApi.gRPC.Services
{
    [Authorize]
    public class DictionaryService : DictionaryProvider.DictionaryProviderBase
    {
        IMediator mediator;
        public DictionaryService(IMediator mediator)
        {
            this.mediator = mediator;
        }
        public override async Task<AddWordsReply> AddWords(AddWordsRequest request, ServerCallContext context)
        {
            var reqestObject = new AuthorizedRequestObject<AddWordsRequest, AddWordsReply>(request)
            {
                UserId = context.GetHttpContext().User.GetUserId()
            };
            AddWordsReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
        }

        public override async Task<WordsReply> GetWords(GetWordsRequest request, ServerCallContext context)
        {
            var reqestObject = new AuthorizedRequestObject<GetWordsRequest, WordsReply>(request)
            {
                UserId = context.GetHttpContext().User.GetUserId()
            };
            WordsReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
        }

        public override async Task<AddWordsReply> UpdateWords(UpdateWordsRequest request, ServerCallContext context)
        {
            var reqestObject = new AuthorizedRequestObject<UpdateWordsRequest, AddWordsReply>(request)
            {
                UserId = context.GetHttpContext().User.GetUserId()
            };
            AddWordsReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
        }

        public override async Task<Empty> DeleteWords(DeleteWordsRequest request, ServerCallContext context)
        {
            var reqestObject = new AuthorizedRequestObject<DeleteWordsRequest, Empty>(request)
            {
                UserId = context.GetHttpContext().User.GetUserId()
            };
            Empty reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
        }

        public override Task<LookupReply> Lookup(LookupRequest request, ServerCallContext context)
        {
            return base.Lookup(request, context);
        }
    }
}
