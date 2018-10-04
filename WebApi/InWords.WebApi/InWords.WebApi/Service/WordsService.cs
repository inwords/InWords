using InWords.Data.Models;
using InWords.Data.Models.Repositories;
using InWords.Transfer.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Service
{
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

        public async Task<List<WordTranslationBase>> AddPair(int userID, IEnumerable<WordTranslation> wordTranslations)
        {
            List<WordTranslationBase> answer = new List<WordTranslationBase>();

            foreach (WordTranslation wordTranslation in wordTranslations)
            {
                await AddWord(userID, wordTranslation, answer);
            }

            return answer;
        }

        private async Task AddWord(int userID, WordTranslation wordTranslation, List<WordTranslationBase> answer)
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
                wordForeign = await wordRepository.FindById(wordpair.WordNativeID);
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

            WordTranslationBase resultPair = new WordTranslationBase()
            {
                Id = wordTranslation.Id,
                ServerId = CreatedPair.UserWordPairID
            };

            lock (answer)
            {
                answer.Add(resultPair);
            }
        }
    }
}
