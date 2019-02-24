namespace InWords.WebApi.Service
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Data;
    using InWords.Transfer.Data;

    public class GameService : ServiceBase
    {
        public GameService(InWordsDataContext context) : base(context)
        {

        }

        public async Task<int> Add(int userID, IEnumerable<GamePack> wordTranslations)
        {
            List<SyncBase> answer = new List<SyncBase>();

            foreach (WordTranslation wordTranslation in wordTranslations)
            {
                await AddUserWordPair(userID, wordTranslation, answer);
            }

            return answer;
        }
    }
}
