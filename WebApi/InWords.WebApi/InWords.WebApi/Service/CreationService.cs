using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Creations;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models.Creation;

namespace InWords.WebApi.Service
{
    /// <summary>
    /// Service that contain CRUD for Creations
    /// </summary>
    /// <see cref="Creation"/>
    public abstract class CreationService : ServiceBase
    {
        /// <summary>
        /// this is creation description repository
        /// </summary>
        protected readonly CreationDescriptionRepository CreationDescriptionRepository;

        /// <summary>
        /// this is creation repository
        /// </summary>
        protected readonly CreationRepository CreationRepository;


        /// <summary>
        /// Standard dependency injected constructor 
        /// </summary>
        /// <param name="context"></param>
        protected CreationService(InWordsDataContext context) : base(context)
        {
            CreationRepository = new CreationRepository(context);
            CreationDescriptionRepository = new CreationDescriptionRepository(context);
        }


        /// <summary>
        /// Allows add creation by creationInformation
        /// </summary>
        /// <see cref="CreationInfo"/>
        /// <param name="creationInfo"></param>
        /// <returns></returns>
        protected async Task<int> AddCreation(CreationInfo creationInfo)
        {
            if (creationInfo.CreatorId == null) throw new ArgumentNullException();

            var creation = new Creation
            {
                CreatorId = (int)creationInfo.CreatorId
            };

            creation = await CreationRepository.Create(creation);

            foreach (DescriptionInfo cdi in creationInfo.Descriptions)
            {
                var cd = new CreationDescription
                {
                    CreationId = creation.CreationId,
                    LanguageId = cdi.LangId,
                    Title = cdi.Title,
                    Description = cdi.Description
                };
                await CreationDescriptionRepository.Create(cd);
            }

            return creation.CreationId;
        }


        /// <summary>
        ///     This is to get short info about creation
        /// </summary>
        /// <see cref="Creation" />
        /// <param name="id"></param>
        /// <returns></returns>
        protected async Task<CreationInfo> GetCreationInfo(int id)
        {
            Creation creation = await CreationRepository.FindById(id);

            if (creation == null) return null;

            List<CreationDescription> descriptionList =
                CreationDescriptionRepository.Get(cd => cd.CreationId == creation.CreationId).ToList();

            var descriptions = new List<DescriptionInfo>();
            foreach (CreationDescription desc in descriptionList)
            {
                var descriptionInfo = new DescriptionInfo
                {
                    LangId = desc.LanguageId,
                    Description = desc.Description,
                    Title = desc.Title
                };
                descriptions.Add(descriptionInfo);
            }

            var creationInfo = new CreationInfo
            {
                CreatorId = creation.CreatorId,
                Descriptions = descriptions
            };

            return creationInfo;
        }


        /// <summary>
        /// This is to get Creation description
        /// </summary>
        /// <see cref="CreationDescription"/>
        /// <param name="creationId"></param>
        /// <returns></returns>
        protected List<CreationDescription> GetDescriptions(int creationId)
        {
            IEnumerable<CreationDescription> descriptions =
                CreationDescriptionRepository.Get(c => c.CreationId == creationId);
            return descriptions.ToList();
        }


        /// <summary>
        ///     This is to delete creation by id
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        protected async Task<int> DeleteCreation(IEnumerable<int> ids)
        {
            var deletions = 0;
            // ReSharper disable once LoopCanBeConvertedToQuery
            foreach (int i in ids)
            {
                deletions += await DeleteCreation(i);
            }
            return deletions;
        }


        /// <summary>
        ///     This is to cascade delete creations dependency
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected async Task<int> DeleteCreation(int id)
        {
            var deletionsCount = 0;
            Creation creation = await CreationRepository.FindById(id);
            deletionsCount = await CreationRepository.Remove(creation);
            return deletionsCount;
        }
    }
}