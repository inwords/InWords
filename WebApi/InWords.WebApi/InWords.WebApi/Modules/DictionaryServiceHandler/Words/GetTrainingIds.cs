using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
    public class GetTrainingIds : AuthorizedRequestObjectHandler<Empty, TrainingIdsReply, InWordsDataContext>
    {
        private readonly int trainingRange = 1;
        public GetTrainingIds(InWordsDataContext context) : base(context) { }

        public override async Task<TrainingIdsReply> HandleRequest(AuthorizedRequestObject<Empty, TrainingIdsReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var value = request.Value;
            var timeGap = DateTime.UtcNow.AddDays(trainingRange);
            var userWords = Context.UserWordPairs.Where(u => u.UserId == userId);
            var inRangeWords = await Context.UserWordPairs.Where(u => u.TimeGap < timeGap)
                .Select(d => d.UserWordPairId)
                .ToArrayAsync()
                .ConfigureAwait(false);

            TrainingIdsReply trainingIdsReply = new TrainingIdsReply();
            trainingIdsReply.UserWordPairs.AddRange(inRangeWords);

            return trainingIdsReply;
        }
    }
}
