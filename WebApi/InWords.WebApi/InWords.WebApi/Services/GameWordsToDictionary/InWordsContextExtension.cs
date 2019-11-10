using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Creations.GameBox;

namespace InWords.WebApi.Services.GameWordsToDictionary
{
    public static class InWordsContextExtension
    {
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
