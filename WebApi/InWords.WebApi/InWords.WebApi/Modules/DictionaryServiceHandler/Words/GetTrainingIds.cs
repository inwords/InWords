using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.DictionaryServiceHandler.Extentions;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
    public class GetTrainingIds : AuthorizedRequestObjectHandler<Empty, TrainingIdsReply, InWordsDataContext>
    {
        public GetTrainingIds(InWordsDataContext context) : base(context) { }

        public override async Task<TrainingIdsReply> HandleRequest(AuthorizedRequestObject<Empty, TrainingIdsReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var value = request.Value;
            var inRangeWords = await Context.UserWordPairs.TrainingWords(userId)
                .Select(d => d.UserWordPairId)
                .ToArrayAsync()
                .ConfigureAwait(false);

            TrainingIdsReply trainingIdsReply = new TrainingIdsReply();

            if (inRangeWords != null)
                trainingIdsReply.UserWordPairs.AddRange(inRangeWords);

            return trainingIdsReply;
        }
    }
}
