using System.Linq;
using System.Threading.Tasks;
using InWords.Common;
using InWords.Data.Creations;

namespace InWords.Data.Repositories
{
    public class CreationRepository : Repository<Creation>
    {
        public CreationRepository(InWordsDataContext context) : base(context)
        {
        }

        public async Task<int> DeleteGames(params int[] gameId)
        {
            Creation[] creationsByGameId = GetCreationsByGameID(gameId).ToArray();
            return await Remove(creationsByGameId);
        }

        public async Task<int> DeleteOwnGames(int userId, params int[] gameId)
        {
            IQueryable<Creation> creationsToDelete =
                GetCreationsByGameID(gameId).Where(c => c.CreatorId.Equals(userId));
            return await Remove(creationsToDelete.ToArray());
        }

        private IQueryable<Creation> GetCreationsByGameID(params int[] gameId)
        {
            IQueryable<Creation> creationsByGameID = from creation in DbSet
                where gameId.Contains(creation.CreationId)
                select creation;
            return creationsByGameID;
        }
    }
}