using MediatR;

namespace InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId
{
    public class GameToUserQuery : IRequest<GameToUserQueryResult>
    {
        public GameToUserQuery(int userId, int creationId)
        {
            UserId = userId;
            CreationId = creationId;
        }

        public int UserId { get; set; }
        public int CreationId { get; set; }
    }
}