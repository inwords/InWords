using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.DictionaryServiceHandler.Extentions;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static InWords.Protobuf.TrainingReply.Types;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
    public class GetTrainingWords : AuthorizedRequestObjectHandler<Empty, TrainingReply, InWordsDataContext>
    {
        public GetTrainingWords(InWordsDataContext context) : base(context) { }

        public override async Task<TrainingReply> HandleRequest(
            AuthorizedRequestObject<Empty, TrainingReply> request, 
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var value = request.Value;
            var inRangeWords = await Context.UserWordPairs.TrainingWords(userId)
                .Select(d => new TrainingPair() 
                {
                    ForeignWord = d.ForeignWord,
                    NativeWord = d.NativeWord,
                    UserWordPair = d.UserWordPairId
                })
                .ToArrayAsync()
                .ConfigureAwait(false);

            TrainingReply trainingIdsReply = new TrainingReply();
            trainingIdsReply.Pairs.AddRange(inRangeWords);
            return trainingIdsReply;
        }
    }
}
