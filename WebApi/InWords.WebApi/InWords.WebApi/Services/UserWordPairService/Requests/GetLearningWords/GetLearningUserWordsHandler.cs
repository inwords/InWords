using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.Services.Abstractions;
using MediatR;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords
{
    public class GetLearningUserWordsHandler : ContextRequestHandler<GetLearningUserWordsQuery,List<UserWordPair>,InWordsDataContext>
    {
        public GetLearningUserWordsHandler(InWordsDataContext context) : base(context) { }

        public override Task<List<UserWordPair>> Handle(GetLearningUserWordsQuery request, CancellationToken cancellationToken = default)
        {
            var userWordPairs = Context.UserWordPairs.Where(uwp => uwp.UserId.Equals(request.UserId));
            var currentPeriod = DateTime.UtcNow.AddDays(1);
            var needToLearn = userWordPairs.Where(uwp => uwp.TimeGap < currentPeriod);
            return base.Handle(request, cancellationToken);
        }
    }
}
