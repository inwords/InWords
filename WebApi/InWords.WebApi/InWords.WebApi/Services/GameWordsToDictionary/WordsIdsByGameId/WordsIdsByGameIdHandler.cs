using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations.GameBox;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InWords.WebApi.Services.GameWordsToDictionary.WordsIdsByGameId
{
    public class WordsIdsByGameIdHandler : IRequestHandler<WordsIdsByGameQuery, WordsIdsByGameIdQueryResult>
    {
        private readonly InWordsDataContext context;
        public WordsIdsByGameIdHandler(InWordsDataContext context)
        {
            this.context = context;
        }

        public Task<WordsIdsByGameIdQueryResult> Handle(WordsIdsByGameQuery request, CancellationToken cancellationToken = default)
        {
            IQueryable<GameLevel> levelsQueryable = context.GameLevels.Levels(request.Id);
            IQueryable<GameLevelWord> levelWordsQueryable = context.GameLevelWords.Words(levelsQueryable);
            IQueryable<int> wordsId = levelWordsQueryable.AsNoTracking().Select(w => w.WordPairId);

            return Task.Run(() => new WordsIdsByGameIdQueryResult
            {
                WordTranslationsList = wordsId.ToList()
            }, cancellationToken);
        }
    }
}
