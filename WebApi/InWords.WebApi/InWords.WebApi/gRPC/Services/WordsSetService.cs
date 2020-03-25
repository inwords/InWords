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
    public class WordsSetService : WordSetProvider.WordSetProviderBase
    {
        private readonly IMediator mediator;
        public WordsSetService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public override async Task<WordSetWordsReply> GetWordsList(WordSetWordsRequest request, ServerCallContext context)
        {
            var requestObject = new AuthorizedRequestObject<WordSetWordsRequest, WordSetWordsReply>(request)
            {
                UserId = context
                .GetHttpContext()
                .User.GetUserId()
            };
            WordSetWordsReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            return reply;
        }

        public override async Task<Empty> ToDictionary(WordSetWordsRequest request, ServerCallContext context)
        {
            var requestObject = new AuthorizedRequestObject<WordSetWordsRequest, Empty>(request)
            {
                UserId = context
                .GetHttpContext()
                .User.GetUserId()
            };
            return await mediator.Send(requestObject).ConfigureAwait(false);
        }

        public override async Task<WordSetReply> GetSets(Empty request, ServerCallContext context)
        {
            var requestObject = new AuthorizedRequestObject<Empty, WordSetReply>(request)
            {
                UserId = context
                .GetHttpContext()
                .User.GetUserId()
            };
            WordSetReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            return reply;
        }
    }
}
