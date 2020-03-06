using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System;
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

        public override Task<WordsReply> GetWords(GetWordsRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }
    }
}
