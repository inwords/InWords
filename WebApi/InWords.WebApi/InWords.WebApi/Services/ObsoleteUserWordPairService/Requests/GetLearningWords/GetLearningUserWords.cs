using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.DTO;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.UserWordPairService.Extension;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords
{
    public class GetLearningUserWords : ContextRequestHandler<GetLearningUserWordsQuery, List<WordTranslation>, InWordsDataContext>
    {
        public GetLearningUserWords(InWordsDataContext context) : base(context)
        {
        }

        public override async Task<List<WordTranslation>> HandleRequest(GetLearningUserWordsQuery request,
            CancellationToken cancellationToken = default)
        {
            IQueryable<UserWordPair> pairsToLearn = Context.UserWordPairs.QueryPairsToLearn(request);

            var userWordPairsLoaded = await pairsToLearn
                .AsNoTracking()
                .ToListAsync()
                .ConfigureAwait(false);

            return userWordPairsLoaded.ToWordTranslations().ToList();
        }
    }
}