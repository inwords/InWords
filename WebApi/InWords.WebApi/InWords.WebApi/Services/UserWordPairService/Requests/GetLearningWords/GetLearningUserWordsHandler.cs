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
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords
{
    public class GetLearningUserWordsHandler : ContextRequestHandler<GetLearningUserWordsQuery, IEnumerable<WordTranslation>, InWordsDataContext>
    {
        public GetLearningUserWordsHandler(InWordsDataContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<WordTranslation>> Handle(GetLearningUserWordsQuery request,
            CancellationToken cancellationToken = default)
        {
            var currentPeriod = DateTime.UtcNow.AddDays(1);
            var userWordPairs = SelectUsersWordPairs(request.UserId);
            var pairsToLearn = SelectPairsToLearn(userWordPairs, currentPeriod);

            var userWordPairsLoaded = await pairsToLearn
                .Include(u => u.WordPair)
                .ThenInclude(wp => wp.WordForeign)
                .Include(u => u.WordPair.WordNative)
                .AsNoTracking()
                .ToListAsync()
                .ConfigureAwait(false);


            return userWordPairsLoaded.ToWordTranslations();
        }

        private static IQueryable<UserWordPair> SelectPairsToLearn(IQueryable<UserWordPair> userWordPairs, DateTime currentPeriod)
        {
            return userWordPairs.Where(uwp => uwp.TimeGap < currentPeriod);
        }

        private IQueryable<UserWordPair> SelectUsersWordPairs(int userId)
        {
            return Context.UserWordPairs.Where(uwp => uwp.UserId.Equals(userId));
        }
    }
}