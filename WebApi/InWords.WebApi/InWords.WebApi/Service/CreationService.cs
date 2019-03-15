using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Creations;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data;
using InWords.Transfer.Data.Models.Creation;

namespace InWords.WebApi.Service
{
    public abstract class CreationService : ServiceBase
    {
        private readonly CreationRepository creationRepository = null;
        private readonly CreationDescriptionRepository creationDescriptionRepository = null;

        public CreationService(InWordsDataContext context) : base(context)
        {
            creationRepository = new CreationRepository(context);
            creationDescriptionRepository = new CreationDescriptionRepository(context);
        }

        protected async Task<int> AddCreation(CreationInfo creationInfo)
        {
            Creation creation = new Creation()
            {
                CreatorId = creationInfo.CreatorId
            };

            creation = await creationRepository.Create(creation);

            foreach (var cdi in creationInfo.Descriptions)
            {
                CreationDescription cd = new CreationDescription()
                {
                    CreationId = creation.CreationId,
                    LanguageId = cdi.LangId,
                    Title = cdi.Title,
                    Description = cdi.Description
                };
                await creationDescriptionRepository.Create(cd);
            }

            return creation.CreationId;
        }

        protected async Task<CreationInfo> GetCreation(int id)
        {
            var creation = await creationRepository.FindById(id);

            if (creation == null) return null;

            var descriptionlist = creationDescriptionRepository.Get(cd => cd.CreationId == creation.CreationId).ToList();

            List<DescriptionInfo> descriptions = new List<DescriptionInfo>();
            foreach (var desc in descriptionlist)
            {
                DescriptionInfo descinfo = new DescriptionInfo()
                {
                    LangId = desc.LanguageId,
                    Description = desc.Title,
                    Title = desc.Title
                };
                descriptions.Add(descinfo);
            }

            CreationInfo creationInfo = new CreationInfo()
            {
                CreatorId = creation.CreatorId,
                Descriptions = descriptions
            };

            return creationInfo;
        }

        protected List<CreationDescription> GetDescriptions(int CreationID)
        {
            var descriptions = creationDescriptionRepository.Get(c => c.CreationId == CreationID);
            return descriptions.ToList();
        }
    }
}
