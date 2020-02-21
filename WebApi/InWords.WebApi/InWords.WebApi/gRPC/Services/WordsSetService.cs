using Grpc.Core;
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
        public override Task<WordSetWordsReply> GetWordsList(WordSetWordsRequest request, ServerCallContext context)
        {
            return base.GetWordsList(request, context);
        }
    }
}
