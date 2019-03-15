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

        protected CreationService(InWordsDataContext context) : base(context)
        {
            creationRepository = new CreationRepository(context);
            creationDescriptionRepository = new CreationDescriptionRepository(context);
        }

        protected async Task<int> AddCreation(CreationInfo creationInfo)
        {
            var creation = new Creation()
            {
                CreatorId = creationInfo.CreatorId
            };

            creation = await creationRepository.Create(creation);

            foreach (DescriptionInfo cdi in creationInfo.Descriptions)
            {
                var cd = new CreationDescription()
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
            Creation creation = await creationRepository.FindById(id);

            if (creation == null) return null;

            List<CreationDescription> descriptionList = creationDescriptionRepository.Get(cd => cd.CreationId == creation.CreationId).ToList();

            List<DescriptionInfo> descriptions = new List<DescriptionInfo>();
            foreach (var desc in descriptionList)
            {
                DescriptionInfo descriptionInfo = new DescriptionInfo()
                {
                    LangId = desc.LanguageId,
                    Description = desc.Title,
                    Title = desc.Title
                };
                descriptions.Add(descriptionInfo);
            }

            CreationInfo creationInfo = new CreationInfo()
            {
                CreatorId = creation.CreatorId,
                Descriptions = descriptions
            };

            return creationInfo;
        }

        protected List<CreationDescription> GetDescriptions(int creationId)
        {
            IEnumerable<CreationDescription> descriptions = creationDescriptionRepository.Get(c => c.CreationId == creationId);
            return descriptions.ToList();
        }
    }
}
