﻿using System.Collections.Generic;
using System.Linq;
using InWords.Data.DTO;

namespace InWords.WebApi.Services
{
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