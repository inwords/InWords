using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WordSet.V2;


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
