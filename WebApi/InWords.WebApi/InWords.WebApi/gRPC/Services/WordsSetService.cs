using Grpc.Core;
using InWords.Protobuf;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;


namespace InWords.WebApi.gRPC.Services
{
    public class WordsSetService : WordSetProvider.WordSetProviderBase
    {
        private readonly IMediator mediator;
        public WordsSetService(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [Authorize]
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
    }
}
