using System.Linq;
using InWords.Data;
using InWords.Data.Creations.GameBox;
using Microsoft.EntityFrameworkCore;

namespace InWords.WebApi.Services.GameWordsToDictionary
{
    public static class InWordsContextExtension
    {
        public static IQueryable<int> WordsInGame(this InWordsDataContext context, int id)
        {
            IQueryable<GameLevel> levelsQueryable = context.GameLevels.Levels(id);
            IQueryable<GameLevelWord> levelWordsQueryable = context.GameLevelWords.Words(levelsQueryable);
            return levelWordsQueryable.AsNoTracking().Select(w => w.WordPairId).Distinct();
        }

        public static IQueryable<GameLevel> Levels(this IQueryable<GameLevel> gameLevels, int id)
        {
            return gameLevels.Where(gl => gl.GameBoxId.Equals(id));
        }

        public static IQueryable<GameLevelWord> Words(this IQueryable<GameLevelWord> gameLevelWords,
            IQueryable<GameLevel> levelsQueryable)
        {
            return gameLevelWords.Where(glw => levelsQueryable.Any(w => w.GameLevelId.Equals(glw.GameLevelId)));
        }
    }
}