using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations.GameBox;
using MediatR;

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
            IQueryable<GameLevel> levelsQueryable = WhereCreationLevels(request);

            IQueryable<GameLevelWord> levelWordsQueryable = WhereLevelWords(levelsQueryable);

            IQueryable<int> wordsId = levelWordsQueryable.Select(w => w.WordPairId);

            return Task.Run(() => new WordsIdsByGameIdQueryResult
            {
                WordTranslationsList = wordsId.ToList()
            }, cancellationToken);
        }

        private IQueryable<GameLevelWord> WhereLevelWords(IQueryable<GameLevel> levelsQueryable)
        {
            return context.GameLevelWords.Where(glw
                => levelsQueryable.Any(w => w.GameLevelId.Equals(glw.GameLevelId)));
        }

        private IQueryable<GameLevel> WhereCreationLevels(WordsIdsByGameQuery request)
        {
            return context.GameLevels.Where(gl => gl.GameBoxId.Equals(request.Id));
        }
    }
}
