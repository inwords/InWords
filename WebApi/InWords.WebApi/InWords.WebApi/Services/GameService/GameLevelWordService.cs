using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.DTO;
using InWords.Data.DTO.GameBox;
using InWords.Data.Repositories;

namespace InWords.WebApi.Services.GameService
{
    public class GameLevelWordService
    {
        public async Task AddWordsToLevel(List<WordTranslation> wordTranslations, int gameLevelId)
        {
            foreach (WordTranslation pair in wordTranslations)
            {
                WordPair wordPair = await wordsService.AddPair(pair);

                var gameLevelWord = new GameLevelWord
                {
                    GameLevelId = gameLevelId,
                    WordPairId = wordPair.WordPairId
                };

                await gameLevelWordRepository.CreateAsync(gameLevelWord);
            }
        }

        public Level GetLevelWords(int levelId)
        {
            IEnumerable<GameLevelWord> gameLevelWords =
                gameLevelWordRepository.GetWhere(l => l.GameLevelId.Equals(levelId));

            IEnumerable<int> ids = gameLevelWords.Select(gl => gl.WordPairId);

            var wordTranslations = new List<WordTranslation>();
            wordTranslations.AddRange(wordsService.GetWordsById(ids));

            var level = new Level
            {
                LevelId = levelId,
                WordTranslations = wordTranslations
            };

            return level;
        }

        #region ctor

        private readonly WordsService wordsService;
        private readonly GameLevelWordRepository gameLevelWordRepository;

        public GameLevelWordService(WordsService wordsService, GameLevelWordRepository gameLevelWordRepository)
        {
            this.wordsService = wordsService;
            this.gameLevelWordRepository = gameLevelWordRepository;
        }

        #endregion
    }
}