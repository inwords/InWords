using InWords.Data.Models;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models;

namespace InWords.WebApi.Service
{
    using InWords.Transfer.Data;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class WordsService : ServiceBase
    {
        private readonly UserWordPairRepository userWordPairRepository = null;
        private readonly WordPairRepository wordPairRepository = null;
        private readonly WordRepository wordRepository = null;

        public WordsService(InWordsDataContext context) : base(context)
        {
            userWordPairRepository = new UserWordPairRepository(this.context);
            wordPairRepository = new WordPairRepository(this.context);
            wordRepository = new WordRepository(this.context);
        }

        public async Task<List<SyncBase>> AddPair(int userId, IEnumerable<WordTranslation> wordTranslations)
        {
            var answer = new List<SyncBase>();

            foreach (var wordTranslation in wordTranslations)
            {
                await AddUserWordPair(userId, wordTranslation, answer);
            }

            return answer;
        }

        public async Task<WordPair> AddPair(WordTranslation wordTranslation)
        {
            Word firstWordForeign = new Word
            {
                Content = wordTranslation.WordForeign
            };

            Word secondWordNative = new Word
            {
                Content = wordTranslation.WordNative
            };

            return await wordPairRepository.Stack(firstWordForeign, secondWordNative);
        }

        public IEnumerable<int> UserWordsId(int userID)
        {
            return userWordPairRepository.Get(uwp => uwp.UserId == userID).Select(uwp => uwp.UserWordPairId);
        }

        public List<WordTranslation> GetUserWordsById(IEnumerable<int> ids)
        {
            List<WordTranslation> wordTranslations = new List<WordTranslation>();

            foreach (int id in ids)
            {
                var uwp = userWordPairRepository.GetWithInclude(x => x.UserWordPairId == id,
                    wp => wp.WordPair,
                    wf => wf.WordPair.WordForeign,
                    wn => wn.WordPair.WordNative).Single();

                string wordForeign = uwp.WordPair.WordForeign.Content;
                string wordNative = uwp.WordPair.WordNative.Content;

                WordTranslation addedWord = null;
                if (uwp.IsInvertPair)
                {
                    addedWord = new WordTranslation(wordNative, wordForeign);
                }
                else
                {
                    addedWord = new WordTranslation(wordForeign, wordNative);
                }

                addedWord.ServerId = id;

                wordTranslations.Add(addedWord);
            }
            return wordTranslations;
        }

        public List<WordTranslation> GetWordsById(IEnumerable<int> ids)
        {
            var wordTranslations = new List<WordTranslation>();

            foreach (var id in ids)
            {
                var uwp = wordPairRepository.GetWithInclude(x => x.WordPairId == id,
                    wf => wf.WordForeign,
                    wn => wn.WordNative).Single();

                var addedWord = new WordTranslation()
                {
                    WordForeign = uwp.WordForeign.Content,
                    WordNative = uwp.WordNative.Content,
                    ServerId = id
                };

                wordTranslations.Add(addedWord);
            }
            return wordTranslations;
        }


        public async Task<int> DeleteUserWordPair(int userId, IEnumerable<int> userWordPairIDs)
        {
            int wordsRemoved = 0;
            foreach (int uwpID in userWordPairIDs)
            {
                wordsRemoved += await DeleteUserWordPair(userId, uwpID);
            }
            return wordsRemoved;
        }

        public async Task<int> DeleteUserWordPair(int userId, int userWordPairId)
        {
            //todo union.expect ??
            var userwordpair = userWordPairRepository.Get(uwp => uwp.UserWordPairId == userWordPairId && uwp.UserId == userId).SingleOrDefault();

            if (userwordpair != null)
            {
                return await userWordPairRepository.Remove(userwordpair);
            }
            else
            {
                return 0;
            }
        }

        private async Task AddUserWordPair(int userId, WordTranslation wordTranslation, List<SyncBase> answer)
        {
            var wordpair = await AddPair(wordTranslation);
            var wordPairId = wordpair.WordPairId;

            var wordPair = wordPairRepository.GetWithInclude(wp => wp.WordPairId == wordPairId,
                f => f.WordForeign,
                n => n.WordNative)
                .Single();

            var createdPair = new UserWordPair()
            {
                WordPairId = wordPairId,
                IsInvertPair = wordPair.WordForeign.Content != wordTranslation.WordForeign,
                UserId = userId
            };

            createdPair = await userWordPairRepository.Stack(createdPair);

            var resultPair = new SyncBase()
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
