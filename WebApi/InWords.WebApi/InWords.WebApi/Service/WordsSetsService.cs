namespace InWords.WebApi.Service
{
    using InWords.Data.Models;
    using InWords.Data.Models.Repositories;
    using InWords.Transfer.Data;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class WordsSetsService : ServiceBase
    {
        private readonly WordsService wordsService = null;
        private readonly SeriaRepository seriaRepository = null;
        private readonly SeriaDescriptionRepository seriaDescriptionRepository = null;
        private readonly SeriaWordRepository seriaWordRepository = null;

        public WordsSetsService(Data.InWordsDataContext context) : base(context)
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

        /// <summary>
        /// This is to add words in WordSet,
        /// wordsSeriaPack contains seriaID
        /// </summary>
        /// <param name="userID">UserIdentity that add the words</param>
        /// <param name="wordsSeriaPack">seria id and words list from request</param>
        /// <returns></returns>
        public async Task AddWords(int userID, WordsSeriaPart wordsSeriaPack)
        {
            var seriaId = wordsSeriaPack.SeriaID;

            var uwpList = await wordsService.AddPair(userID, wordsSeriaPack.WordTranslations);

            foreach (var uwp in uwpList)
            {
                var sw = new SeriaWord()
                {
                    SeriaID = seriaId,
                    UserWordPairID = uwp.ServerId
                };
                await seriaWordRepository.Create(sw);
            }
        }

        public async Task<WordsSeriaInformation> Get(int userID, int seriaID)
        {
            WordsSeriaInformation wordsSeriaInformation = null;

            Seria seria = await seriaRepository.GetInclude(s => s.SeriaID == seriaID).ToAsyncEnumerable().SingleOrDefault();

            if (seria == null) { return null; }

            wordsSeriaInformation = new WordsSeriaInformation()
            {
                CreatorNick = $"{seria.Creator.NickName}@{seria.CreatorID}",
                ServerId = seria.SeriaID
            };


            wordsSeriaInformation.WordSeriaDescriptions = new List<WordSeriaDescription>();
            foreach (SeriaDescription desc in seria.SeriaDescriptions)
            {
                wordsSeriaInformation.WordSeriaDescriptions
                    .Add(new WordSeriaDescription()
                    {
                        LangID = desc.LanguageID,
                        Title = desc.Title,
                        Description = desc.Description
                    });
            }

            return wordsSeriaInformation;
        }

    }
}