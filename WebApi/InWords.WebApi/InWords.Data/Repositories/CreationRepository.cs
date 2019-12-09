using System.Linq;
using System.Threading.Tasks;
using InWords.Common;
using InWords.Data.Creations;

namespace InWords.Data.Repositories
{
    public class CreationRepository : Repository<Game>
    {
        public CreationRepository(InWordsDataContext context) : base(context)
        {
        }

        public async Task<int> DeleteGames(params int[] gameId)
        {
            Game[] creationsByGameId = GetCreationsByGameID(gameId).ToArray();
            return await Remove(creationsByGameId);
        }

        public async Task<int> DeleteOwnGames(int userId, params int[] gameId)
        {
            IQueryable<Game> creationsToDelete =
                GetCreationsByGameID(gameId).Where(c => c.CreatorId.Equals(userId));
            return await Remove(creationsToDelete.ToArray());
        }

        private IQueryable<Game> GetCreationsByGameID(params int[] gameId)
        {
            IQueryable<Game> creationsByGameID = from creation in DbSet
                where gameId.Contains(creation.GameId)
                select creation;
            return creationsByGameID;
        }
    }
}