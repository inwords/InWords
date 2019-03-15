namespace InWords.WebApi.Service
{
    using InWords.Data.Models;
    using InWords.Transfer.Data;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class WordsService : ServiceBase
    {
        private readonly UserWordPairRepository userWordPairRepository = null;
        private readonly WordPairRepository wordPairRepository = null;
        private readonly WordRepository wordRepository = null;

        public WordsService(Data.InWordsDataContext context) : base(context)
        {
            userWordPairRepository = new UserWordPairRepository(this.context);
            wordPairRepository = new WordPairRepository(this.context);
            wordRepository = new WordRepository(this.context);
        }

        public async Task<List<SyncBase>> AddPair(int userID, IEnumerable<WordTranslation> wordTranslations)
        {
            List<SyncBase> answer = new List<SyncBase>();

            foreach (WordTranslation wordTranslation in wordTranslations)
            {
                await AddUserWordPair(userID, wordTranslation, answer);
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

        public IEnumerable<int> UserWordsID(int userID)
        {
            return userWordPairRepository.Get(uwp => uwp.UserId == userID).Select(uwp => uwp.UserWordPairId);
        }

        public async Task<List<WordTranslation>> GetUserWordsByID(IEnumerable<int> ids)
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

        public async Task<List<WordTranslation>> GetWordsByID(IEnumerable<int> ids)
        {
            List<WordTranslation> wordTranslations = new List<WordTranslation>();

            foreach (int id in ids)
            {
                var uwp = wordPairRepository.GetWithInclude(x => x.WordPairId == id,
                    wf => wf.WordForeign,
                    wn => wn.WordNative).Single();

                WordTranslation addedWord = new WordTranslation()
                {
                    WordForeign = uwp.WordForeign.Content,
                    WordNative = uwp.WordNative.Content,
                    ServerId = id
                };

                wordTranslations.Add(addedWord);
            }
            return wordTranslations;
        }


        public async Task<int> DeleteUserWordPair(int userID, IEnumerable<int> userWordPairIDs)
        {
            int wordsRemoved = 0;
            foreach (int uwpID in userWordPairIDs)
            {
                wordsRemoved += await DeleteUserWordPair(userID, uwpID);
            }
            return wordsRemoved;
        }

        public async Task<int> DeleteUserWordPair(int userID, int userWordPairID)
        {
            //todo union.expect ??
            var userwordpair = userWordPairRepository.Get(uwp => uwp.UserWordPairId == userWordPairID && uwp.UserId == userID).SingleOrDefault();

            if (userwordpair != null)
            {
                return await userWordPairRepository.Remove(userwordpair);
            }
            else
            {
                return 0;
            }
        }

        private async Task AddUserWordPair(int userID, WordTranslation wordTranslation, List<SyncBase> answer)
        {
            var wordpair = await AddPair(wordTranslation);
            int wordpairID = wordpair.WordPairId;

            var wordPair = wordPairRepository.GetWithInclude(wp => wp.WordPairId == wordpairID,
                f => f.WordForeign,
                n => n.WordNative)
                .Single();

            UserWordPair CreatedPair = new UserWordPair()
            {
                WordPairId = wordpairID,
                IsInvertPair = wordPair.WordForeign.Content != wordTranslation.WordForeign,
                UserId = userID
            };

            CreatedPair = await userWordPairRepository.Stack(CreatedPair);

            SyncBase resultPair = new SyncBase()
            {
                Id = wordTranslation.Id,
                ServerId = CreatedPair.UserWordPairId
            };

            lock (answer)
            {
                answer.Add(resultPair);
            }
        }
    }
}
