using InWords.Data;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static InWords.Protobuf.WordSetReply.Types;

namespace InWords.WebApi.Modules.WordsSets.Extentions
{
    public static class WordSetsExtentions
    {
        public static async Task<WordSetReply> GetWordSets(this InWordsDataContext context, int offset = 0, int limit = 50)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            WordSetReply reply = new WordSetReply();

            var games = (from tags in context.GameTags.Where(d => d.Tags == GameTags.Official)
                         join game in context.Games on tags.GameId equals game.GameId
                         select game).Skip(offset).Take(limit);

            var include = await games.Include(d => d.CreationDescriptions)
                .ToArrayAsync()
                .ConfigureAwait(false);

            var wordsSets = include.Select(g =>
            {
                var description = g.CreationDescriptions.Single(d => d.LanguageId == 2);
                return new WordSetInfo()
                {
                    Id = g.GameId,
                    Picture = g.Picture,
                    Title = description.Title,
                    Description = description.Description
                };
            });
            reply.WordSets.AddRange(wordsSets);
            return reply;
        }

        public static IEnumerable<LevelReply> GetStarredLevels(
            this InWordsDataContext context,
            IQueryable<GameLevel> levelsOfGame,
            int userId)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            return from level in levelsOfGame
                   join userLevel in context.UserGameLevels.Where(u => u.UserId.Equals(userId)
                   && u.GameType == GameType.Total)
                   on level.GameLevelId equals userLevel.GameLevelId into st
                   from userLevel in st.DefaultIfEmpty()
                   select new LevelReply()
                   {
                       LevelId = level.GameLevelId,
                       Level = level.Level,
                       IsAvailable = true,
                       Stars = userLevel == null ? 0 : (int)Math.Round(userLevel.UserStars / 2.0),
                       Score = userLevel == null ? 0 : userLevel.UserStars
                   };
        }
    }
}
