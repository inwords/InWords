using InWords.Data.DTO.GameBox;
using MediatR;

namespace InWords.WebApi.Services.GameService.Requests.GetGameLevels
{
    public class GetLevelsByGameIdQuery : IRequest<GameObject>
    {
        public int GameId { get; set; }
        public int UserId { get; set; }

        public GetLevelsByGameIdQuery(int gameId, int userId)
        {
            GameId = gameId;
            UserId = userId;
        }
    }
}
