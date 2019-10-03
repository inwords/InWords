using System.Linq;
using System.Threading.Tasks;
using InWords.Abstractions;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;

namespace InWords.Data.Repositories
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
            Creation[] creationsByGameId = GetCreationsByGameID(gameId).ToArray();
            return await creationRepository.Remove(creationsByGameId);
        }

        public async Task<int> DeleteOwnGames(int userId, params int[] gameId)
        {
            IQueryable<Creation> creationsToDelete =
                GetCreationsByGameID(gameId).Where(c => c.CreatorId.Equals(userId));
            return await creationRepository.Remove(creationsToDelete.ToArray());
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