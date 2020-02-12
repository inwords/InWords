using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.UserWordPairService.Extension;
using Microsoft.EntityFrameworkCore;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWordsIds
{
    public class GetLearningUserWordsId : ContextRequestHandler<GetLearningUserWordsIdQuery, List<int>, InWordsDataContext>
    {
        public GetLearningUserWordsId(InWordsDataContext context) : base(context) { }

        public override Task<List<int>> HandleRequest(GetLearningUserWordsIdQuery request, CancellationToken cancellationToken = default)
        {
            IQueryable<UserWordPair> pairsToLearn = Context.UserWordPairs.QueryPairsToLearn(request);
            return pairsToLearn.Select(p => p.UserWordPairId).ToListAsync(cancellationToken: cancellationToken);
        }
    }
}
