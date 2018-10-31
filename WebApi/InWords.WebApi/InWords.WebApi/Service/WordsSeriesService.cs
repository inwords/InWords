namespace InWords.WebApi.Service
{
    using InWords.Data.Models;
    using InWords.Data.Models.Repositories;
    using InWords.Transfer.Data;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class WordsSeriesService : ServiceBase
    {
        private readonly WordsService wordsService = null;

        private readonly SeriaRepository seriaRepository = null;
        private readonly SeriaDescriptionRepository seriaDescriptionRepository = null;
        private readonly SeriaWordRepository seriaWordRepository = null;

        public WordsSeriesService(Data.InWordsDataContext context) : base(context)
        {
            wordsService = new WordsService(this.context);
            seriaRepository = new SeriaRepository(context);
            seriaDescriptionRepository = new SeriaDescriptionRepository(context);
            seriaWordRepository = new SeriaWordRepository(context);
        }

        public async Task<SyncBase> AddSeries(int userID, WordsSeriaInformation information)
        {
            Seria wordsSeria = new Seria
            {
                CreatorID = userID
            };

            wordsSeria = await seriaRepository.Create(wordsSeria);

            foreach (WordSeriaDescription wordSeriaDescription in information.WordSeriaDescriptions)
            {
                SeriaDescription seriaDescription = new SeriaDescription()
                {
                    SeriaID = wordsSeria.SeriaID,
                    Description = wordSeriaDescription.Description,
                    LanguageID = wordSeriaDescription.LangID,
                    Title = wordSeriaDescription.Title
                };
                await seriaDescriptionRepository.Create(seriaDescription);
            }

            SyncBase answer = new SyncBase(wordsSeria.SeriaID);

            return answer;
        }
    }
}
