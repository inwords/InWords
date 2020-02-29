using InWords.Data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Services
{
    [Obsolete]
    public class SyncService
    {
        private readonly WordsService wordsService;

        public SyncService(WordsService wordsService)
        {
            this.wordsService = wordsService;
        }

        public PullWordsAnswer PullWordPairs(int userId, IEnumerable<int> serverIDs)
        {
            int[] userWordsIds = serverIDs.ToArray();
            int[] serverWordsIds = wordsService.UserWordsId(userId).ToArray();

            IEnumerable<int> idsToAddOnClient = serverWordsIds.Except(userWordsIds);
            IEnumerable<int> idsToDeleteOnClient = userWordsIds.Except(serverWordsIds);

            IEnumerable<WordTranslation> addedWords = wordsService.GetUserWordsById(idsToAddOnClient);

            var pullResponse = new PullWordsAnswer
            {
                RemovedServerIds = idsToDeleteOnClient.ToList(),
                AddedWords = addedWords.ToList()
            };

            return pullResponse;
        }
    }
}