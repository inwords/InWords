using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models;

namespace InWords.WebApi.Service
{
    public class WordsService : ServiceBase
    {
        private readonly UserWordPairRepository userWordPairRepository;
        private readonly WordPairRepository wordPairRepository;
        private readonly WordRepository wordRepository;

        public WordsService(InWordsDataContext context) : base(context)
        {
            userWordPairRepository = new UserWordPairRepository(context);
            wordPairRepository = new WordPairRepository(context);
            wordRepository = new WordRepository(context);
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
            return userWordPairRepository.Get(uwp => uwp.UserId == userId).Select(uwp => uwp.UserWordPairId);
        }

        public IEnumerable<WordTranslation> GetUserWordsById(IEnumerable<int> ids)
        {
            IEnumerable<UserWordPair> userWordPairs = userWordPairRepository.GetWithInclude(
                x => ids.Contains(x.UserWordPairId),
                wf => wf.WordPair.WordForeign,
                wn => wn.WordPair.WordNative);

            return PackToWordTranslation(userWordPairs);;
        }

        private static IEnumerable<WordTranslation> PackToWordTranslation(IEnumerable<UserWordPair> userWordPairs)
        {
            return userWordPairs.Select(PackToWordTranslation).ToList();
        }

        private static WordTranslation PackToWordTranslation(UserWordPair uwp)
        {
            //todo test this
            Word foreign = uwp.WordPair.WordForeign;
            Word native = uwp.WordPair.WordNative;

            WordTranslation addedWord = uwp.IsInvertPair
                ? new WordTranslation(native.Content, foreign.Content)
                : new WordTranslation(foreign.Content, native.Content);

            addedWord.ServerId = uwp.WordPairId;
            return addedWord;
        }

        public List<WordTranslation> GetWordsById(IEnumerable<int> ids)
        {
            return (from id in ids
                    let uwp = wordPairRepository
                        .GetWithInclude(x => x.WordPairId == id, wf => wf.WordForeign, wn => wn.WordNative).Single()
                    select new WordTranslation
                    {
                        WordForeign = uwp.WordForeign.Content,
                        WordNative = uwp.WordNative.Content,
                        ServerId = id
                    }).ToList();
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
                .Get(uwp => uwp.UserWordPairId == userWordPairId && uwp.UserId == userId).SingleOrDefault();

            if (userWordsPair != null)
                return await userWordPairRepository.Remove(userWordsPair);
            return 0;
        }

        private async Task<SyncBase> AddUserWordPair(int userId, WordTranslation wordTranslation)
        {
            // add word pair in repository
            WordPair wordPair = await AddPair(wordTranslation);

            // Load a word from a cell of a foreign word
            Word wordInForeign = await wordRepository.FindById(wordPair.WordForeignId);

            // If the loaded foreign word does not match the word 
            // in the repository then the pair is considered inverted
            var createdPair = new UserWordPair
            {
                WordPairId = wordPair.WordPairId,
                IsInvertPair = wordInForeign.Content != wordTranslation.WordForeign,
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

        private async Task<List<SyncBase>> UpdateUserWordPair(int userId, int userWordPairId, WordTranslation wordTranslation)
        {
            await DeleteUserWordPair(userId, userWordPairId);
            SyncBase syncBase = await AddUserWordPair(userId, wordTranslation);
            return new List<SyncBase> { syncBase };
        }
    }
}