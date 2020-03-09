using MediatR;
using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

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
    }
}
