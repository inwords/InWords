namespace InWords.WebApi.Service
{
    using InWords.Data.Models;
    using InWords.Data.Models.Repositories;
    using InWords.Transfer.Data;
    using System;
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

        public IEnumerable<int> UserWordsID(int userID)
        {
            return userWordPairRepository.Get(uwp => uwp.UserID == userID).Select(uwp => uwp.UserWordPairID);
        }

        public async Task<List<WordTranslation>> GetWordsByID(IEnumerable<int> ids)
        {
            List<WordTranslation> wordTranslations = new List<WordTranslation>();

            foreach (int id in ids)
            {
                var uwp = await userWordPairRepository.FindById(id);
                var wordpair = await wordPairRepository.FindById(uwp.WordPairID);
                var word1 = await wordRepository.FindById(wordpair.WordForeignID);
                var word2 = await wordRepository.FindById(wordpair.WordNativeID);

                WordTranslation addedWord = new WordTranslation
                {
                    ServerId = id
                };

                if (uwp.IsInvertPair)
                {
                    addedWord.WordNative = word1.Content;
                    addedWord.WordForeign = word2.Content;
                }
                else
                {
                    addedWord.WordNative = word2.Content;
                    addedWord.WordForeign = word1.Content;
                }
                wordTranslations.Add(addedWord);
            }
            return wordTranslations;
        }

        private async Task AddUserWordPair(int userID, WordTranslation wordTranslation, List<SyncBase> answer)
        {
            Word firstWordForeign = new Word
            {
                Content = wordTranslation.WordForeign
            };

            Word secondWordNative = new Word
            {
                Content = wordTranslation.WordNative
            };

            var wordpair = await wordPairRepository.Stack(firstWordForeign, secondWordNative);

            Word wordForeign = wordpair.WordForeign;
            Word native = wordpair.WordNative;

            if (wordpair.WordForeign == null)
            {
                wordForeign = await wordRepository.FindById(wordpair.WordForeignID);
            }

            if (wordpair.WordNative == null)
            {
                native = await wordRepository.FindById(wordpair.WordNativeID);
            }

            UserWordPair CreatedPair = new UserWordPair()
            {
                WordPairID = wordpair.WordPairID,
                IsInvertPair = wordForeign.Content == firstWordForeign.Content,
                UserID = userID
            };

            CreatedPair = await userWordPairRepository.Stack(CreatedPair);

            SyncBase resultPair = new SyncBase()
            {
                Id = wordTranslation.Id,
                ServerId = CreatedPair.UserWordPairID
            };

            lock (answer)
            {
                answer.Add(resultPair);
            }
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
            var userwordpairs = userWordPairRepository.Get(uwp => uwp.UserWordPairID == userWordPairID && uwp.UserID == userID);

            if (userwordpairs.Count() == 1)
            {
                UserWordPair pairToDelete = null;
                pairToDelete = userwordpairs.First();
                return await userWordPairRepository.Remove(pairToDelete);
            }
            else
            {
                return 0;
            }
        }
    }
}
