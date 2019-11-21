using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.DTO.GameBox;
using MediatR;

namespace InWords.WebApi.Services.GameService.GetGameLevels
{
    public class GetLevelsByGameIdQuery : IRequest<GameObject>
    {
        public int GameId { get; set; }
    }
}
