using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.WebApi.Services.GameWordsToDictionary.WordsIdsByGameId;
using MediatR;

namespace InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId
{
    public class GameToUserQuery : IRequest<GameToUserQueryResult>
    {
        public int UserId { get; set; }
        public int CreationId { get; set; }
    }
}
