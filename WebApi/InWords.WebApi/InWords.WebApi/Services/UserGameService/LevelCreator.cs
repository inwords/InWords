using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.Repositories;

namespace InWords.WebApi.Services.UserGameService
{
    [Obsolete]
    public class LevelCreator
    {
        private readonly CreationRepository creationRepository;
        private readonly GameLevelRepository gameLevelRepository;
        private readonly GameLevelWordRepository gameLevelWordRepository;
        private readonly UserWordPairRepository userWordPairRepository;

        public LevelCreator(InWordsDataContext context)
        {
            userWordPairRepository = new UserWordPairRepository(context);
            creationRepository = new CreationRepository(context);
            gameLevelRepository = new GameLevelRepository(context);
            gameLevelWordRepository = new GameLevelWordRepository(context);
        }

        public async Task<int> CreateUserLevelAsync(int userId, IEnumerable<int> userWordPairIds)
        {
            // TODO rewrite no repo

            // resolve to word pair
            IEnumerable<UserWordPair> uwp =
                userWordPairRepository.GetWhere(u => userWordPairIds.Contains(u.UserWordPairId));

            // create if not user game catalog exist 
            Game game = creationRepository.GetWhere(c => c.CreatorId.Equals(userId)).SingleOrDefault();
            if (game == null)
            {
                game = new Game {CreatorId = userId};
                await creationRepository.CreateAsync(game).ConfigureAwait(false);
            }

            // add level by WordsPairs
            int levelsCount = gameLevelRepository.GetWhere(g => g.GameId.Equals(game.GameId)).Count();
            var gameLevel = new GameLevel
            {
                GameId = game.GameId,
                Level = levelsCount + 1
            };
            gameLevel = await gameLevelRepository.CreateAsync(gameLevel).ConfigureAwait(false);
            // level add words
            IEnumerable<GameLevelWord> gameLevelWords = uwp.Select(u => new GameLevelWord
                {GameLevelId = gameLevel.GameLevelId, WordPairId = u.WordPairId});
            await gameLevelWordRepository.Create(gameLevelWords.ToArray()).ConfigureAwait(false);

            // return levelId
            return gameLevel.GameLevelId;
        }
    }
}