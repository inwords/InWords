using System;
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
    [Obsolete]
    public class GameLevelWordService
    {
        private readonly GameLevelWordRepository gameLevelWordRepository;
        private readonly WordsService wordsService;

        public GameLevelWordService(WordsService wordsService, GameLevelWordRepository gameLevelWordRepository)
        {
            this.wordsService = wordsService;
            this.gameLevelWordRepository = gameLevelWordRepository;
        }

        public async Task AddWordsToLevelAsync(List<WordTranslation> wordTranslations, int gameLevelId)
        {
            foreach (WordTranslation pair in wordTranslations)
            {
                WordPair wordPair = await wordsService.AddPairAsync(pair).ConfigureAwait(false);

                var gameLevelWord = new GameLevelWord
                {
                    GameLevelId = gameLevelId,
                    WordPairId = wordPair.WordPairId
                };

                await gameLevelWordRepository.CreateAsync(gameLevelWord).ConfigureAwait(false);
            }
        }

        public async Task<Level> GetLevelWordsAsync(int levelId)
        {
            Level level = await Task.Run(() => GetLevelWords(levelId))
                .ConfigureAwait(false);

            return level;
        }

        public Level GetLevelWords(int levelId)
        {
            IEnumerable<GameLevelWord> gameLevelWords =
                gameLevelWordRepository.GetWhere(l => l.GameLevelId.Equals(levelId));

            IEnumerable<int> ids = gameLevelWords.Select(gl => gl.WordPairId);

            return new Level
            {
                LevelId = levelId,
                WordTranslations = wordsService.GetWordsById(ids)
            };
        }
    }
}