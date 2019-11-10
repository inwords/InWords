using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.DTO;
using InWords.Data.Repositories;
using InWords.WebApi.Extensions;

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

        public async Task<List<SyncBase>> AddPairAsync(int userId, IEnumerable<WordTranslation> wordTranslations)
        {
            var answer = new List<SyncBase>();

            foreach (WordTranslation wordTranslation in wordTranslations)
                answer.Add(await AddUserWordPairAsync(userId, wordTranslation)
                    .ConfigureAwait(false));

            return answer;
        }

        public Task<WordPair> AddPairAsync(WordTranslation wordTranslation)
        {
            var firstWordForeign = new Word
            {
                Content = wordTranslation.WordForeign
            };

            var secondWordNative = new Word
            {
                Content = wordTranslation.WordNative
            };

            return wordPairRepository.Stack(firstWordForeign, secondWordNative);
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

        public async Task<int> DeleteUserWordPairAsync(int userId, IEnumerable<int> userWordPairIDs)
        {
            var wordsRemoved = 0;
            foreach (int uwpId in userWordPairIDs)
                wordsRemoved += await DeleteUserWordPairAsync(userId, uwpId).ConfigureAwait(false);

            return wordsRemoved;
        }

        public Task<int> DeleteUserWordPairAsync(int userId, int userWordPairId)
        {
            // todo union.expect ??
            UserWordPair userWordsPair = userWordPairRepository
                .GetWhere(uwp => uwp.UserWordPairId.Equals(userWordPairId) && uwp.UserId.Equals(userId))
                .SingleOrDefault();

            return userWordsPair != null ? userWordPairRepository.Remove(userWordsPair) : new Task<int>(() => 0);
        }

        private async Task<SyncBase> AddUserWordPairAsync(int userId, WordTranslation wordTranslation)
        {
            // add word pair in repository
            WordPair wordPair = await AddPairAsync(wordTranslation).ConfigureAwait(false);

            // Load a word from a cell of a foreign word
            Word wordForeign = await wordRepository.FindById(wordPair.WordForeignId).ConfigureAwait(false);

            // If the loaded foreign word does not match the word 
            // in the repository then the pair is considered inverted
            var createdPair = new UserWordPair
            {
                WordPairId = wordPair.WordPairId,
                IsInvertPair = !wordForeign.Content.Equals(wordTranslation.WordForeign.ToLower()),
                UserId = userId
            };

            // add pair to user dictionary
            createdPair = await userWordPairRepository.Stack(createdPair).ConfigureAwait(false);

            // create answer
            var resultPair = new SyncBase
            {
                Id = wordTranslation.Id,
                ServerId = createdPair.UserWordPairId
            };

            return resultPair;
        }

        public async Task<List<SyncBase>> UpdateUserWordPairAsync(int userId,
            Dictionary<int, WordTranslation> wordTranslations)
        {
            var syncBase = new List<SyncBase>(wordTranslations.Count);
            foreach (KeyValuePair<int, WordTranslation> wordTranslation in wordTranslations)
            {
                await DeleteUserWordPairAsync(userId, wordTranslation.Key).ConfigureAwait(false);
                syncBase.Add(await AddUserWordPairAsync(userId, wordTranslation.Value).ConfigureAwait(false));
            }

            return syncBase;
        }
    }
}