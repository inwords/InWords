using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Models;
using InWords.Transfer.Data;

namespace InWords.WebApi.Service
{
    public abstract class CreationService : ServiceBase
    {
        private CreationRepository creationRepository = null;
        private CreationDescriptionRepository creationDescriptionRepository = null;

        public CreationService(InWordsDataContext context) : base(context)
        {
            creationRepository = new CreationRepository(context);
            creationDescriptionRepository = new CreationDescriptionRepository(context);
        }

        protected async Task<int> AddCreation(CreationInfo creationInfo)
        {
            Creation creation = new Creation()
            {
                CreatorID = creationInfo.CreatorID
            };

            creation = await creationRepository.Create(creation);

            List<CreationDescription> creationDescriptions = new List<CreationDescription>();

            foreach (var cdi in creationInfo.Descriptions)
            {
                CreationDescription cd = new CreationDescription()
                {
                    CreationID = creation.CreationID,
                    LanguageID = cdi.LangID,
                    Title = cdi.Title,
                    Description = cdi.Description
                };
                await creationDescriptionRepository.Create(cd);
            }

            return creation.CreationID;
        }

        protected async Task<CreationInfo> GetCreation(int id)
        {
            var creation = await creationRepository.FindById(id);

            if (creation == null) return null;

            var descriptionlist = creationDescriptionRepository.Get(cd => cd.CreationID == creation.CreationID).ToList();

            List<DescriptionInfo> descriptions = new List<DescriptionInfo>();
            foreach (var desc in descriptionlist)
            {
                DescriptionInfo descinfo = new DescriptionInfo()
                {
                    LangID = desc.LanguageID,
                    Description = desc.Title,
                    Title = desc.Title
                };
                descriptions.Add(descinfo);
            }

            CreationInfo creationInfo = new CreationInfo()
            {
                CreatorID = creation.CreatorID,
                Descriptions = descriptions
            };

            return creationInfo;
        }
    }
}
