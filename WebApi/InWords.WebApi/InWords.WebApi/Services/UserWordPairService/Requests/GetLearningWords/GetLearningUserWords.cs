using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.DTO;
using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.UserWordPairService.Extension;
using Microsoft.EntityFrameworkCore;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords
{
    public class GetLearningUserWords : ContextRequestHandler<GetLearningUserWordsQuery, IEnumerable<WordTranslation>, InWordsDataContext>
    {
        public GetLearningUserWords(InWordsDataContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<WordTranslation>> Handle(GetLearningUserWordsQuery request,
            CancellationToken cancellationToken = default)
        {
            IQueryable<UserWordPair> pairsToLearn = Context.UserWordPairs.QueryPairsToLearn(request);

            var userWordPairsLoaded = await pairsToLearn
                .Include(u => u.WordPair)
                .ThenInclude(wp => wp.WordForeign)
                .Include(u => u.WordPair.WordNative)
                .AsNoTracking()
                .ToListAsync()
                .ConfigureAwait(false);

            return userWordPairsLoaded.ToWordTranslations();
        }
    }
}