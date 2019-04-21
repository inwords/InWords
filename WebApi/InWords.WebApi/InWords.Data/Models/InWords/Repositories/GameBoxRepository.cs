using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Creations;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.Data.Models.InWords.Repositories
{
    public class GameBoxRepository : Repository<GameBox>
    {
        private readonly InWordsDataContext context;
        private readonly CreationRepository creationRepository;

        public GameBoxRepository(InWordsDataContext context, CreationRepository creationRepository) : base(context)
        {
            this.creationRepository = creationRepository;
            this.context = context;
        }

        public async Task<int> DeleteGames(params int[] gameId)
        {
            IQueryable<Creation> creationsByGameID = GetCreationsByGameID(gameId);
            return await creationRepository.Remove(creationsByGameID);
        }

        public async Task<int> DeleteOwnGames(int userId, params int[] gameId)
        {
            IQueryable<Creation> creationsToDelete = GetCreationsByGameID(gameId).Where(c => c.CreatorId.Equals(userId));
            return await creationRepository.Remove(creationsToDelete);
        }

        private IQueryable<Creation> GetCreationsByGameID(params int[] gameId)
        {
            IQueryable<Creation> creationsByGameID = from games in context.GameBoxs
                                                     join creations in context.Creations on games.CreationId equals creations.CreationId
                                                     where gameId.Contains(games.GameBoxId)
                                                     select creations;
            return creationsByGameID;
        }
    }
}