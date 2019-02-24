using InWords.Transfer.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Service
{
    public class SyncService : ServiceBase
    {
        private readonly WordsService wordsService = null;

        public SyncService(Data.InWordsDataContext context) : base(context)
        {
            wordsService = new WordsService(context);

        }

        public async Task<PullWordsAnswer> PullWordPairs(int userID, IEnumerable<int> serverIDs)
        {
            ///string[] server = { "Microsoft", "Google", "Apple" };
            //string[] user = { "Apple", "IBM", "Samsung" };

            // разность множеств
            //var idsToAdd = server.Except(user);
            //Microsoft Google -> idsToAdd


            //var result = user.Except(server);
            //"IBM", "Samsung" //ids to delete

            IEnumerable<int> userWordsIDs = serverIDs;
            IEnumerable<int> serverWordsIDs = wordsService.UserWordsID(userID);

            IEnumerable<int> idsToAdd_OnClient = serverWordsIDs.Except(userWordsIDs);
            IEnumerable<int> idsToDelete_OnClient = userWordsIDs.Except(serverWordsIDs);

            List<WordTranslation> addedWords = await wordsService.GetUserWordsByID(idsToAdd_OnClient);

            var pullResponce = new PullWordsAnswer
            {
                RemovedServerIds = idsToDelete_OnClient.ToList(),
                AddedWords = addedWords,
            };

            return pullResponce;
        }
    }
}
