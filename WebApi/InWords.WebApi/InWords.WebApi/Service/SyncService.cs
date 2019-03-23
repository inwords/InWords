using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Transfer.Data.Models;

namespace InWords.WebApi.Service
{
    public class SyncService : ServiceBase
    {
        private readonly WordsService wordsService;

        public SyncService(InWordsDataContext context) : base(context)
        {
            wordsService = new WordsService(context);
        }

        public Task<PullWordsAnswer> PullWordPairs(int userId, IEnumerable<int> serverIDs)
        {
            //string[] server = { "Microsoft", "Google", "Apple" };
            //string[] user = { "Apple", "IBM", "Samsung" };

            //var idsToAdd = server.Except(user);
            //Microsoft Google -> idsToAdd

            //var result = user.Except(server);
            //"IBM", "Samsung" //ids to delete


            IEnumerable<int> userWordsIds = serverIDs;
            IEnumerable<int> serverWordsIds = wordsService.UserWordsId(userId);

            IEnumerable<int> idsToAddOnClient = serverWordsIds.Except(userWordsIds);
            IEnumerable<int> idsToDeleteOnClient = userWordsIds.Except(serverWordsIds);

            List<WordTranslation> addedWords = wordsService.GetUserWordsById(idsToAddOnClient);

            var pullResponse = new PullWordsAnswer
            {
                RemovedServerIds = idsToDeleteOnClient.ToList(),
                AddedWords = addedWords
            };

            return pullResponse;
        }
    }
}