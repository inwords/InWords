using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models.Creation;
using InWords.Transfer.Data.Models.GameBox;
using InWords.WebApi.Extentions.Transfer;

namespace InWords.WebApi.Services.GameService
{
    /// <summary>
    /// This is actually GameRepository processor
    /// </summary>
    public abstract class BaseGameService
    {
        private readonly GameBoxRepository gameBoxRepository;
        private readonly CreationService creationService;
        private readonly InWordsDataContext context;

        protected BaseGameService(GameBoxRepository gameBoxRepository, CreationService creationService, InWordsDataContext context)
        {
            this.gameBoxRepository = gameBoxRepository;
            this.creationService = creationService;
            this.context = context;
        }

        public async Task<List<GameInfo>> GetGames()
        {
            var gameInfos = new List<GameInfo>();

            List<GameBox> games = gameBoxRepository.GetAllEntities().ToList();

            foreach (GameBox game in games)
            {
                CreationInfo creationInfo = await creationService.GetCreationInfo(game.CreationId);

                // TODO: (LNG) title 
                DescriptionInfo russianDescription = creationInfo.Descriptions.GetRus();

                var gameInfo = new GameInfo
                {
                    CreatorId = creationInfo.CreatorId ?? 0,
                    GameId = game.GameBoxId,
                    IsAvailable = true,
                    Title = russianDescription.Title,
                    Description = russianDescription.Description
                };

                gameInfos.Add(gameInfo);
            }

            return gameInfos;
        }

        // TODO update

        public async Task<int> DeleteGames(params int[] gameId)
        {
            IEnumerable<int> creationsId =
                gameBoxRepository.GetWhere(g => gameId.Contains(g.GameBoxId)).Select(c => c.CreationId);

            int deletionsCount = await creationService.DeleteCreation(creationsId);

            return deletionsCount;
        }

        public async Task<int> DeleteOwnGames(int userId, params int[] gameId)
        {
            // find all users game that id equals gameId
            IQueryable<int> id = from games in context.GameBoxs
                                 join creations in context.Creations on games.CreationId equals creations.CreationId
                                 where creations.CreatorId.Equals(userId) && gameId.Contains(games.GameBoxId)
                                 select creations.CreationId;

            return await creationService.DeleteCreation(id);
        }
    }
}