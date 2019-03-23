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
                await AddUserWordPair(userId, wordTranslation, answer);

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

        public List<WordTranslation> GetUserWordsById(IEnumerable<int> ids)
        {
            var wordTranslations = new List<WordTranslation>();

            foreach (int id in ids)
            {
                UserWordPair uwp = userWordPairRepository.GetWithInclude(x => x.UserWordPairId == id,
                    wp => wp.WordPair,
                    wf => wf.WordPair.WordForeign,
                    wn => wn.WordPair.WordNative).Single();

                string wordForeign = uwp.WordPair.WordForeign.Content;
                string wordNative = uwp.WordPair.WordNative.Content;

                WordTranslation addedWord = null;
                addedWord = uwp.IsInvertPair
                    ? new WordTranslation(wordNative, wordForeign)
                    : new WordTranslation(wordForeign, wordNative);

                addedWord.ServerId = id;

                wordTranslations.Add(addedWord);
            }

            return wordTranslations;
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

        private async Task AddUserWordPair(int userId, WordTranslation wordTranslation, List<SyncBase> answer)
        {
            WordPair wordpair = await AddPair(wordTranslation);
            int wordPairId = wordpair.WordPairId;

            WordPair wordPair = wordPairRepository.GetWithInclude(wp => wp.WordPairId == wordPairId,
                    f => f.WordForeign,
                    n => n.WordNative)
                .Single();

            var createdPair = new UserWordPair
            {
                WordPairId = wordPairId,
                IsInvertPair = wordPair.WordForeign.Content != wordTranslation.WordForeign,
                UserId = userId
            };

            createdPair = await userWordPairRepository.Stack(createdPair);

            var resultPair = new SyncBase
            {
                Id = wordTranslation.Id,
                ServerId = createdPair.UserWordPairId
            };

            lock (answer)
            {
                answer.Add(resultPair);
            }
        }
    }
}