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
    public class LevelCreator
    {
        private readonly UserWordPairRepository userWordPairRepository;
        private readonly CreationRepository creationRepository;
        private readonly GameBoxRepository gameBoxRepository;
        private readonly GameLevelRepository gameLevelRepository;
        private readonly GameLevelWordRepository gameLevelWordRepository;

        public LevelCreator(InWordsDataContext context)
        {
            this.userWordPairRepository = new UserWordPairRepository(context);
            this.creationRepository = new CreationRepository(context);
            this.gameBoxRepository = new GameBoxRepository(context, creationRepository);
            this.gameLevelRepository = new GameLevelRepository(context);
            this.gameLevelWordRepository = new GameLevelWordRepository(context);
        }

        public async Task<int> CreateUserLevelAsync(int userId, IList<int> userWordPairIds)
        {
            // TODO rewrite no repo

            // resolve to word pair
            IEnumerable<UserWordPair> uwp = userWordPairRepository.GetWhere(u => userWordPairIds.Contains(u.UserWordPairId));

            // create if not user game catalog exist 
            Creation creation = creationRepository.GetWhere(c => c.CreatorId.Equals(userId)).SingleOrDefault();
            GameBox game;
            if (creation == null)
            {
                creation = new Creation { CreatorId = userId };
                await creationRepository.CreateAsync(creation).ConfigureAwait(false);
                game = new GameBox { CreationId = creation.CreationId };
                await gameBoxRepository.CreateAsync(game).ConfigureAwait(false);
            }
            else
            {
                game = gameBoxRepository.GetWhere(g => g.CreationId.Equals(creation.CreationId)).SingleOrDefault();
            }
            if (game == null) throw new ArgumentNullException();

            // add level by WordsPairs
            int levelsCount = gameLevelRepository.GetWhere(g => g.GameBoxId.Equals(game.GameBoxId)).Count();
            var gameLevel = new GameLevel()
            {
                GameBoxId = game.GameBoxId,
                Level = levelsCount + 1,
            };
            GameLevel gamelevel = await gameLevelRepository.CreateAsync(gameLevel).ConfigureAwait(false);
            // level add words
            IEnumerable<GameLevelWord> gameLevelWords = uwp.Select(u => new GameLevelWord() { GameLevelId = gamelevel.GameLevelId, WordPairId = u.WordPairId });
            await gameLevelWordRepository.Create(gameLevelWords.ToArray()).ConfigureAwait(false);

            // return levelId
            return gamelevel.GameLevelId;
        }
    }
}
