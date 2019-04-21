using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models.InWords.Creations;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models.Creation;

namespace InWords.WebApi.Services
{
    /// <summary>
    ///     Service that contain CRUD for Creations
    /// </summary>
    /// <see cref="Creation" />
    public class CreationService
    {
        #region Ctor

        protected readonly CreationDescriptionRepository CreationDescriptionRepository;

        protected readonly CreationRepository CreationRepository;

        public CreationService(CreationRepository сreationRepository, CreationDescriptionRepository сreationDescriptionRepository)
        {
            CreationRepository = сreationRepository;
            CreationDescriptionRepository = сreationDescriptionRepository;
        }

        #endregion

        public async Task<int> AddCreation(CreationInfo creationInfo)
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

        public CreationInfo GetCreationInfo(int id)
        {
            // find creation information
            Creation creation = CreationRepository.GetWithInclude(n => n.Creator.NickName)
                .AsQueryable()
                .Where(c => c.CreationId.Equals(id))
                .SingleOrDefault();

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
            // ReSharper disable once LoopCanBeConvertedToQuery
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
    }
}