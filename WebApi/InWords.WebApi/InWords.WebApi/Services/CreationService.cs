using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Creations;
using InWords.Data.DTO.Creation;
using InWords.Data.Repositories;

namespace InWords.WebApi.Services
{
    /// <summary>
    ///     Service that contain CRUD for Creations
    /// </summary>
    /// <see cref="Creation" />
    public class CreationService
    {
        public async Task<Creation> AddCreationInfoAsync(CreationInfo creationInfo)
        {
            if (creationInfo.CreatorId == null)
                throw new ArgumentNullException($"{nameof(creationInfo)} creator not found");

            var creation = new Creation
            {
                CreatorId = (int) creationInfo.CreatorId
            };

            creation = await CreationRepository.CreateAsync(creation).ConfigureAwait(true);

            IEnumerable<CreationDescription> creationDescriptions = creationInfo.Descriptions.Select(cd =>
                new CreationDescription
                {
                    CreationId = creation.CreationId,
                    LanguageId = cd.LangId,
                    Title = cd.Title,
                    Description = cd.Description
                });

            await CreationDescriptionRepository.Create(creationDescriptions.ToArray()).ConfigureAwait(true);

            return creation;
        }

        public CreationInfo GetCreationInfo(int id)
        {
            // find creation information
            Creation creation = CreationRepository
                .GetWithInclude(n => n.Creator)
                .SingleOrDefault(c => c.CreationId.Equals(id));

            if (creation == null) return null;

            // select creation description from descriptions repository
            List<CreationDescription> descriptionList =
                CreationDescriptionRepository.GetWhere(cd => cd.CreationId == creation.CreationId).ToList();

            // form descriptions infos
            List<DescriptionInfo> descriptions = GetDescriptionInfos(descriptionList);

            var creationInfo = new CreationInfo
            {
                CreatorId = creation.CreatorId,
                CreatorNickname = creation.Creator.NickName,
                Descriptions = descriptions
            };

            return creationInfo;
        }

        public async Task<int> DeleteCreation(IEnumerable<int> ids)
        {
            var deletions = 0;
            foreach (int i in ids) deletions += await DeleteCreation(i);
            return deletions;
        }

        public async Task<int> DeleteCreation(int id)
        {
            Creation creation = await CreationRepository.FindById(id);
            int deletionsCount = await CreationRepository.Remove(creation);
            return deletionsCount;
        }

        private static List<DescriptionInfo> GetDescriptionInfos(IEnumerable<CreationDescription> descriptionList)
        {
            return descriptionList
                .Select(desc => new DescriptionInfo
                {
                    LangId = desc.LanguageId,
                    Description = desc.Description,
                    Title = desc.Title
                }).ToList();
        }

        #region Ctor

        private readonly CreationDescriptionRepository CreationDescriptionRepository;

        private readonly CreationRepository CreationRepository;

        public CreationService(CreationRepository сreationRepository,
            CreationDescriptionRepository сreationDescriptionRepository)
        {
            CreationRepository = сreationRepository;
            CreationDescriptionRepository = сreationDescriptionRepository;
        }

        #endregion
    }
}