using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Creations;
using InWords.Data.DTO.Creation;
using InWords.Data.Repositories;

namespace InWords.WebApi.Services
{
    [Obsolete]
    /// <summary>
    ///     Service that contain CRUD for Games
    /// </summary>
    /// <see cref="Game" />
    public class CreationService
    {
        public async Task<Game> AddCreationInfoAsync(CreationInfo creationInfo)
        {
            if (creationInfo.CreatorId == null)
                throw new ArgumentNullException($"{nameof(creationInfo)} creator not found");

            var creation = new Game
            {
                CreatorId = (int) creationInfo.CreatorId
            };

            creation = await CreationRepository.CreateAsync(creation).ConfigureAwait(false);

            IEnumerable<CreationDescription> creationDescriptions = creationInfo.Descriptions.Select(cd =>
                new CreationDescription
                {
                    CreationId = creation.GameId,
                    LanguageId = cd.LangId,
                    Title = cd.Title,
                    Description = cd.Description
                });

            await CreationDescriptionRepository.Create(creationDescriptions.ToArray()).ConfigureAwait(false);

            return creation;
        }

        public CreationInfo GetCreationInfo(int id)
        {
            // find game information
            Game game = CreationRepository
                .GetWithInclude(n => n.Creator)
                .SingleOrDefault(c => c.GameId.Equals(id));

            if (game == null) return null;

            // select game description from descriptions repository
            List<CreationDescription> descriptionList =
                CreationDescriptionRepository.GetWhere(cd => cd.CreationId == game.GameId).ToList();

            // form descriptions infos
            List<DescriptionInfo> descriptions = GetDescriptionInfos(descriptionList);

            var creationInfo = new CreationInfo
            {
                CreatorId = game.CreatorId,
                CreatorNickname = game.Creator.NickName,
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
            Game game = await CreationRepository.FindById(id);
            int deletionsCount = await CreationRepository.Remove(game);
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