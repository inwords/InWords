using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.DTO;
using InWords.Data.Repositories;
using InWords.WebApi.TransferData;

namespace InWords.WebApi.Services
{
    public class WordsService
    {
        private readonly UserWordPairRepository userWordPairRepository;
        private readonly WordPairRepository wordPairRepository;
        private readonly WordRepository wordRepository;

        public WordsService(UserWordPairRepository userWordPairRepository,
            WordPairRepository wordPairRepository,
            WordRepository wordRepository)
        {
            this.userWordPairRepository = userWordPairRepository;
            this.wordPairRepository = wordPairRepository;
            this.wordRepository = wordRepository;
        }

        public async Task<List<SyncBase>> AddPair(int userId, IEnumerable<WordTranslation> wordTranslations)
        {
            var answer = new List<SyncBase>();

            foreach (WordTranslation wordTranslation in wordTranslations)
                answer.Add(await AddUserWordPair(userId, wordTranslation));

            return answer;
        }

        public async Task<WordPair> AddPair(WordTranslation wordTranslation)
        {
            var firstWordForeign = new Word
            {
                Content = wordTranslation.WordForeign
            };

            var secondWordNative = new Word
            {
                Content = wordTranslation.WordNative
            };

            return await wordPairRepository.Stack(firstWordForeign, secondWordNative);
        }

        public IEnumerable<int> UserWordsId(int userId)
        {
            return userWordPairRepository.GetWhere(uwp => uwp.UserId == userId).Select(uwp => uwp.UserWordPairId);
        }

        public IEnumerable<WordTranslation> GetUserWordsById(IEnumerable<int> ids)
        {
            IEnumerable<UserWordPair> userWordPairs = userWordPairRepository
                .IncludeWordPairs()
                .Where(x => ids.Contains(x.UserWordPairId));

            return userWordPairs.ToWordTranslations();
        }

        public List<WordTranslation> GetWordsById(IEnumerable<int> ids)
        {
            return ids.Select(GetWordTranslationById).ToList();
        }

        public WordTranslation GetWordTranslationById(int id)
        {
            WordPair wordPair = wordPairRepository.IncludeContent().Single(x => x.WordPairId.Equals(id));

            return new WordTranslation(wordPair.WordForeign.Content, wordPair.WordNative.Content, id);
        }

        public async Task<int> DeleteUserWordPair(int userId, IEnumerable<int> userWordPairIDs)
        {
            var wordsRemoved = 0;
            foreach (int uwpId in userWordPairIDs) wordsRemoved += await DeleteUserWordPair(userId, uwpId);
            return wordsRemoved;
        }

        public async Task<int> DeleteUserWordPair(int userId, int userWordPairId)
        {
            //todo union.expect ??
            UserWordPair userWordsPair = userWordPairRepository
                .GetWhere(uwp => uwp.UserWordPairId.Equals(userWordPairId) && uwp.UserId.Equals(userId))
                .SingleOrDefault();

            if (userWordsPair != null)
                return await userWordPairRepository.Remove(userWordsPair);
            return 0;
        }

        private async Task<SyncBase> AddUserWordPair(int userId, WordTranslation wordTranslation)
        {
            // add word pair in repository
            WordPair wordPair = await AddPair(wordTranslation);

            // Load a word from a cell of a foreign word
            Word wordForeign = await wordRepository.FindById(wordPair.WordForeignId);

            // If the loaded foreign word does not match the word 
            // in the repository then the pair is considered inverted
            var createdPair = new UserWordPair
            {
                WordPairId = wordPair.WordPairId,
                IsInvertPair = wordForeign.Content != wordTranslation.WordForeign.ToLower(),
                UserId = userId
            };

            // add pair to user dictionary
            createdPair = await userWordPairRepository.Stack(createdPair);

            // create answer
            var resultPair = new SyncBase
            {
                Id = wordTranslation.Id,
                ServerId = createdPair.UserWordPairId
            };

            return resultPair;
        }

        private async Task<List<SyncBase>> UpdateUserWordPair(int userId, int userWordPairId,
            WordTranslation wordTranslation)
        {
            await DeleteUserWordPair(userId, userWordPairId);
            SyncBase syncBase = await AddUserWordPair(userId, wordTranslation);
            return new List<SyncBase> { syncBase };
        }
    }
}